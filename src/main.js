import { FunnelApp } from './funnel.js';

export function mountApp(container) {
  const app = new FunnelApp(container);
  app.render();
  return app;
}

const root = document.getElementById('app');

if (root) {
  mountApp(root);
}
