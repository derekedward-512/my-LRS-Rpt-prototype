import express from 'express';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const dist = path.resolve(here, '../dist');
const docs = path.resolve(here, '../docs-site/build');
const port = Number(process.env.PORT) || 8080;

const app = express();

app.get('/healthz', (_req, res) => {
  res.status(200).send('ok');
});

app.use(express.static(dist));

// The Docusaurus site, if it has been built. Docusaurus emits a real index.html per
// route, so express.static handles directory indexes and deep links on its own.
// Must come before the SPA fallback below, which would otherwise swallow /docs/*.
if (existsSync(docs)) {
  app.use('/docs', express.static(docs));
}

// SPA fallback: any non-static path renders the client, which owns routing.
app.get('/*splat', (_req, res) => {
  res.sendFile(path.join(dist, 'index.html'));
});

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
