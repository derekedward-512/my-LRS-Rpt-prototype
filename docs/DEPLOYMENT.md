---
title: Deployment
sidebar_position: 99
---

# Deployment

Push to `main` → GitHub Actions builds the container → it runs on Google Cloud Run.

The workflow (`.github/workflows/deploy.yml`) is already written. This page covers the
one-time setup it depends on. Budget ~15 minutes, and you need someone with permission to
create service accounts in the GCP project.

## What you need first

| Thing | Notes |
|---|---|
| A GCP project | Existing or new. You need its project ID. |
| `gcloud` CLI | Authenticated: `gcloud auth login` |
| `gh` CLI | Authenticated: `gh auth login` |
| A service name | Usually the repo name. Lowercase, hyphens. |

## 1. Fill in the workflow

Edit the `env:` block at the top of `.github/workflows/deploy.yml`:

```yaml
env:
  SERVICE: my-prototype        # your Cloud Run service name
  PROJECT_ID: my-gcp-project   # your GCP project ID
  REGION: us-central1          # leave unless you have a reason
```

## 2. Bootstrap the GCP project

Run these once, with your own values substituted:

```bash
PROJECT_ID=my-gcp-project
REPO=your-org/your-repo

# Enable the APIs the deploy uses
gcloud services enable \
  run.googleapis.com \
  cloudbuild.googleapis.com \
  artifactregistry.googleapis.com \
  --project "$PROJECT_ID"

# Create the service account GitHub Actions will deploy as
gcloud iam service-accounts create deployer \
  --display-name "GitHub Actions deployer" \
  --project "$PROJECT_ID"

# Grant it what it needs
for ROLE in \
  roles/run.admin \
  roles/cloudbuild.builds.editor \
  roles/artifactregistry.admin \
  roles/iam.serviceAccountUser \
  roles/storage.admin
do
  gcloud projects add-iam-policy-binding "$PROJECT_ID" \
    --member "serviceAccount:deployer@$PROJECT_ID.iam.gserviceaccount.com" \
    --role "$ROLE" --condition=None
done
```

## 3. Give GitHub the key

```bash
gcloud iam service-accounts keys create /tmp/sa-key.json \
  --iam-account "deployer@$PROJECT_ID.iam.gserviceaccount.com"

gh secret set GCP_SA_KEY --repo "$REPO" < /tmp/sa-key.json

rm -f /tmp/sa-key.json
```

**Never commit this key.** It lives only in the `GCP_SA_KEY` GitHub secret. Delete the
local copy — the `rm` above is part of the procedure, not an afterthought.

## 4. Deploy

Push to `main`. Then:

```bash
gh run watch                                    # follow the deploy
gcloud run services describe "$SERVICE" \
  --project "$PROJECT_ID" --region us-central1 \
  --format 'value(status.url)'                  # get the URL
```

## How it fits together

`npm run build` compiles the React app into `dist/` and the docs site into
`docs-site/build/`. The `Dockerfile` runs that build, then copies both outputs plus
`server/` into a small Node image. `server/index.ts` serves `dist/` on the port Cloud Run
assigns via `process.env.PORT`, mounts the docs at `/docs`, and returns `index.html` for
anything else so client-side routing survives a page refresh.

The docs are built inside the container, so the deploy workflow needs no separate step —
`--source .` ships the tree and Cloud Build does the rest.

## When it breaks

| Symptom | Cause |
|---|---|
| Build fails in CI | Almost always a TypeScript error. Reproduce with `npm run build` locally. |
| `Permission denied` during deploy | The service account is missing a role, or `GCP_SA_KEY` is stale. Re-run step 2, re-set the secret. |
| Deploy succeeds, URL returns 5xx | The container isn't listening on `$PORT`. Check `gcloud run services logs read "$SERVICE" --region us-central1`. |
| Deploy is very slow | `.gcloudignore` isn't excluding `node_modules` and `dist`. |
| Direct link to a route 404s | The SPA fallback in `server/index.ts` was modified. |
| `/docs` shows the prototype instead of the docs | The `/docs` mount must come *before* the SPA fallback in `server/index.ts`. |
| `docusaurus: not found` during build | `docs-site/` deps missing — run `npm install` at the root; its `postinstall` handles them. |

## Two things you may want later

**Restrict who can see it.** The service deploys with `--allow-unauthenticated`, so the URL
is public to anyone who has it. For an internal prototype, either put
[Identity-Aware Proxy](https://cloud.google.com/iap) in front of the service, or add
app-level Google OAuth in `server/index.ts` and gate on the email domain. IAP is less code;
OAuth gives you the user's identity inside the app.

**A stable URL.** Cloud Run URLs are ugly and change if you rename the service. Firebase
Hosting can sit in front with a rewrite to the Cloud Run service, giving you a
`*.web.app` domain and a CDN.
