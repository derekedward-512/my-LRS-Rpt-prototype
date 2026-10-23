import path from 'node:path';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import { themes as prismThemes } from 'prism-react-renderer';

// The docs are served under /docs/ by the Express server, alongside the prototype.
// DOCS_BASE_URL exists so one build can also be served from another path later
// (a branch preview, say) without touching this file. Always keep the trailing slash.
const docsBaseUrl = process.env.DOCS_BASE_URL || '/docs/';

// Strip the trailing "docs/" to get back to the prototype's root, so the navbar
// link home stays correct wherever the site is mounted.
const prototypeHome = docsBaseUrl.replace(/docs\/?$/, '') || '/';

const config: Config = {
  title: 'Product Docs',
  tagline: 'The thinking behind the prototype',
  favicon: 'img/favicon.ico',

  // Cosmetic — only used to build absolute URLs in metadata.
  url: 'https://example.com',
  baseUrl: docsBaseUrl,

  // PM docs accumulate forward references to things not written yet. Warn, don't fail.
  onBrokenLinks: 'warn',

  i18n: { defaultLocale: 'en', locales: ['en'] },

  markdown: {
    // .md is plain CommonMark, .mdx gets full MDX. Without this a literal "<" in
    // prose fails the MDX compiler with an error nobody can act on.
    format: 'detect',
    hooks: { onBrokenMarkdownLinks: 'warn' },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          // The repo's docs/ tree is the source of truth. Nothing is copied.
          path: path.resolve(__dirname, '../docs'),
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.ts'),
          include: ['**/*.{md,mdx}'],
          exclude: ['**/node_modules/**', '**/.*/**'],
        },
        blog: false,
        pages: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: [
    [
      // Search index is built at compile time and shipped with the site —
      // no external service, no API key, works behind SSO.
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        indexDocs: true,
        indexBlog: false,
        indexPages: false,
        docsRouteBasePath: '/',
        language: ['en'],
        highlightSearchTermsOnTargetPage: true,
        searchResultLimits: 8,
        searchBarShortcut: true,
        searchBarShortcutHint: true,
      },
    ],
  ],

  themeConfig: {
    // The prototype is light-only, so the docs are too — otherwise the two
    // surfaces look like different products.
    colorMode: { defaultMode: 'light', disableSwitch: true },
    docs: { sidebar: { hideable: true, autoCollapseCategories: false } },
    navbar: {
      title: 'Product Docs',
      logo: { alt: 'Trimble', src: 'img/logo.svg' },
      items: [
        { type: 'docSidebar', sidebarId: 'productDocs', position: 'left', label: 'Docs' },
        {
          // Raw HTML on purpose: Docusaurus's Link component prepends baseUrl,
          // which would keep this link inside the docs site instead of leaving it.
          type: 'html',
          position: 'left',
          value: `<a class="navbar__item navbar__link" href="${prototypeHome}" target="_self" rel="noopener">Prototype</a>`,
        },
      ],
    },
    prism: { theme: prismThemes.github, darkTheme: prismThemes.dracula },
  } satisfies Preset.ThemeConfig,
};

export default config;
