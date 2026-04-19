import { FunnelApp } from './funnel.js';
import { inject } from '@vercel/analytics';

export function mountApp(container) {
  const app = new FunnelApp(container);
  app.render();
  return app;
}

const root = document.getElementById('app');

if (root) {
  mountApp(root);
}

// Initialize Vercel Analytics
inject();
