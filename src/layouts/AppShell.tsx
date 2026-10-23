import { Outlet } from 'react-router-dom';
import { ModusWcNavbar } from '@trimble-oss/moduswebcomponents-react';
import type { INavbarVisibility, INavbarUserCard } from '@trimble-oss/moduswebcomponents';

// Fake user — prototypes never wire real identity.
const USER: INavbarUserCard = {
  name: 'Prototype User',
  email: 'prototype.user@trimble.com',
};

const VISIBILITY: INavbarVisibility = {
  logo: true,
  user: true,
  apps: true,
  help: true,
  notifications: true,
  search: false,
  mainMenu: false,
  ai: false,
  searchInput: false,
};

export default function AppShell() {
  return (
    <div className="flex min-h-dvh flex-col">
      <ModusWcNavbar userCard={USER} visibility={VISIBILITY}>
        {/* A plain anchor, not react-router's <Link>: /docs is served by Express,
            not by this SPA, so client-side routing would 404 into the prototype. */}
        <a
          slot="end"
          href={`${import.meta.env.BASE_URL}docs/`}
          className="px-3 text-sm font-semibold text-primary no-underline"
        >
          Docs
        </a>
      </ModusWcNavbar>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
