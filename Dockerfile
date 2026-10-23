# Vite client + Docusaurus docs + Express static server → single container on port 8080.

FROM node:22-slim AS builder
WORKDIR /app

# Both manifests before the install, so the root postinstall (which runs
# `npm ci` inside docs-site/) has something to install, and the dependency
# layer still caches independently of source changes.
COPY package*.json ./
COPY docs-site/package*.json ./docs-site/
RUN npm ci

COPY . .

# Docusaurus bakes its base path in at build time; the Express server mounts it at /docs.
ENV DOCS_BASE_URL=/docs/
RUN npm run build

FROM node:22-slim
WORKDIR /app

# --ignore-scripts skips postinstall, which would otherwise pull the whole
# Docusaurus toolchain into the runtime image. Only the built output is needed.
COPY package*.json ./
RUN npm ci --omit=dev --ignore-scripts

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/docs-site/build ./docs-site/build
COPY server ./server
COPY tsconfig.json ./

USER node

ENV PORT=8080
ENV NODE_ENV=production
EXPOSE 8080

CMD ["node_modules/.bin/tsx", "server/index.ts"]
