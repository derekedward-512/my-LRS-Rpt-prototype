import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ModusWcThemeProvider } from '@trimble-oss/moduswebcomponents-react';
import App from './App';
import './index.css';

// No StrictMode: its dev double-mount reparents slotted children of Modus web
// components and throws NotFoundError / removeChild.
// basename keeps routing correct when the app is served from a sub-path
// (a GitHub Pages project site); it is "/" everywhere else.
createRoot(document.getElementById('root')!).render(
  <ModusWcThemeProvider>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </ModusWcThemeProvider>,
);
