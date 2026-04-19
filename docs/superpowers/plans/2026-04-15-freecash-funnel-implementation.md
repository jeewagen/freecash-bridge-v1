# FreeCash Funnel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a local 3-screen mobile funnel that transplants the Stitch HTML from `Page 1 FINAL`, `Page 2 FINAL`, and `Page 3 FINAL`, then adds the required age-button routing, loading animation/progress timing, and countdown CTA behavior.

**Architecture:** Use a small static web app with `index.html`, one shared stylesheet, and one behavior script. Store the three Stitch final-screen exports as local HTML fragments, render one screen at a time in a single app root, and attach behavior through a thin controller layer so the imported markup stays as intact as possible.

**Tech Stack:** HTML, CSS, vanilla JavaScript, npm scripts, Vitest, jsdom

---

## File Map

- Create: `package.json` - local scripts for dev server and tests
- Create: `index.html` - app shell and mount point
- Create: `styles/app.css` - shared app-shell and patch CSS
- Create: `src/constants.js` - funnel timings and placeholder CTA URL
- Create: `src/screens/page1.html` - Stitch `Page 1 FINAL` export
- Create: `src/screens/page2.html` - Stitch `Page 2 FINAL` export
- Create: `src/screens/page3.html` - Stitch `Page 3 FINAL` export
- Create: `src/screenTemplates.js` - imports screen HTML strings
- Create: `src/funnel.js` - step controller and behavior wiring
- Create: `src/main.js` - bootstraps funnel into the DOM
- Create: `tests/funnel.test.js` - flow, timing, and DOM behavior coverage

### Task 1: Bootstrap the static app and test harness

**Files:**
- Create: `package.json`
- Create: `index.html`
- Create: `src/main.js`
- Test: `tests/funnel.test.js`

- [ ] **Step 1: Write the failing test**

```js
import { describe, expect, test } from 'vitest';

describe('app bootstrap', () => {
  test('mounts a funnel root container', async () => {
    document.body.innerHTML = '<div id="app"></div>';
    const { mountApp } = await import('../src/main.js');

    mountApp(document.getElementById('app'));

    expect(document.querySelector('[data-funnel-root]')).not.toBeNull();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run tests/funnel.test.js`
Expected: FAIL because `../src/main.js` does not exist yet

- [ ] **Step 3: Write minimal implementation**

```json
{
  "name": "freecash-funnel",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "npx serve .",
    "test": "vitest --environment jsdom"
  },
  "devDependencies": {
    "jsdom": "^26.1.0",
    "vitest": "^3.2.4"
  }
}
```

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>FreeCash Funnel</title>
    <link rel="stylesheet" href="./styles/app.css" />
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="./src/main.js"></script>
  </body>
</html>
```

```js
export function mountApp(container) {
  container.innerHTML = '<main data-funnel-root></main>';
}

if (typeof document !== 'undefined') {
  const app = document.getElementById('app');
  if (app) {
    mountApp(app);
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- --run tests/funnel.test.js`
Expected: PASS with `1 passed`

### Task 2: Import the three Stitch final screens as local templates

**Files:**
- Create: `src/screens/page1.html`
- Create: `src/screens/page2.html`
- Create: `src/screens/page3.html`
- Create: `src/screenTemplates.js`
- Test: `tests/funnel.test.js`

- [ ] **Step 1: Write the failing test**

```js
test('exposes all three final screen templates', async () => {
  const { screenTemplates } = await import('../src/screenTemplates.js');

  expect(Object.keys(screenTemplates)).toEqual(['page1', 'page2', 'page3']);
  expect(screenTemplates.page1.length).toBeGreaterThan(100);
  expect(screenTemplates.page2.length).toBeGreaterThan(100);
  expect(screenTemplates.page3.length).toBeGreaterThan(100);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run tests/funnel.test.js`
Expected: FAIL because `screenTemplates.js` does not exist yet

- [ ] **Step 3: Write minimal implementation**

```html
<!-- Paste Stitch Page 1 FINAL HTML export here exactly, then add stable data hooks only if required -->
```

```html
<!-- Paste Stitch Page 2 FINAL HTML export here exactly, then add stable data hooks only if required -->
```

```html
<!-- Paste Stitch Page 3 FINAL HTML export here exactly, then add stable data hooks only if required -->
```

```js
import page1 from './screens/page1.html?raw';
import page2 from './screens/page2.html?raw';
import page3 from './screens/page3.html?raw';

export const screenTemplates = {
  page1,
  page2,
  page3,
};
```

If `?raw` import support is unavailable in the chosen dev flow, replace this with exported template-string modules:

```js
export const page1 = `...`;
export const page2 = `...`;
export const page3 = `...`;
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- --run tests/funnel.test.js`
Expected: PASS with template lengths greater than `100`

### Task 3: Render Screen 1 and route both age buttons to Screen 2

**Files:**
- Create: `src/constants.js`
- Create: `src/funnel.js`
- Modify: `src/main.js`
- Test: `tests/funnel.test.js`

- [ ] **Step 1: Write the failing test**

```js
test('both age buttons advance from page 1 to page 2', async () => {
  document.body.innerHTML = '<div id="app"></div>';
  const { mountApp } = await import('../src/main.js');

  mountApp(document.getElementById('app'));

  document.querySelector('[data-age-option="21-plus"]').click();
  expect(document.querySelector('[data-screen-id="page2"]')).not.toBeNull();

  mountApp(document.getElementById('app'));
  document.querySelector('[data-age-option="under-21"]').click();
  expect(document.querySelector('[data-screen-id="page2"]')).not.toBeNull();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run tests/funnel.test.js`
Expected: FAIL because no screen controller or age-button bindings exist

- [ ] **Step 3: Write minimal implementation**

```js
export const CTA_URL = 'https://example.com/freecash-offer';
export const CHECKLIST_DELAY_MS = 700;
export const PROGRESS_DURATION_MS = 2500;
export const COUNTDOWN_START_SECONDS = 14 * 60 + 59;
```

```js
import { screenTemplates } from './screenTemplates.js';

export class FunnelApp {
  constructor(container) {
    this.container = container;
    this.currentScreen = 'page1';
  }

  render() {
    this.container.innerHTML = `<div data-funnel-root>${screenTemplates[this.currentScreen]}</div>`;
    this.bindCurrentScreen();
  }

  goTo(screenId) {
    this.currentScreen = screenId;
    this.render();
  }

  bindCurrentScreen() {
    if (this.currentScreen !== 'page1') return;
    this.container.querySelectorAll('[data-age-option]').forEach((button) => {
      button.addEventListener('click', () => this.goTo('page2'));
    });
  }
}
```

```js
import { FunnelApp } from './funnel.js';

export function mountApp(container) {
  const app = new FunnelApp(container);
  app.render();
  return app;
}
```

Also patch `Page 1 FINAL` so the two CTA buttons expose:

```html
data-age-option="21-plus"
```

```html
data-age-option="under-21"
```

And wrap the screen root with:

```html
data-screen-id="page1"
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- --run tests/funnel.test.js`
Expected: PASS with both button flows reaching page 2

### Task 4: Add Screen 2 checklist timing, progress fill, and auto-advance

**Files:**
- Modify: `src/funnel.js`
- Modify: `src/screens/page2.html`
- Test: `tests/funnel.test.js`

- [ ] **Step 1: Write the failing test**

```js
import { vi } from 'vitest';

test('page 2 reveals checklist items, fills progress, and auto-advances', async () => {
  vi.useFakeTimers();
  document.body.innerHTML = '<div id="app"></div>';
  const { mountApp } = await import('../src/main.js');
  mountApp(document.getElementById('app'));

  document.querySelector('[data-age-option="21-plus"]').click();

  expect(document.querySelector('[data-screen-id="page2"]')).not.toBeNull();
  expect(document.querySelectorAll('[data-check-item].is-visible')).toHaveLength(0);

  vi.advanceTimersByTime(700);
  expect(document.querySelectorAll('[data-check-item].is-visible')).toHaveLength(1);

  vi.advanceTimersByTime(1400);
  expect(document.querySelectorAll('[data-check-item].is-visible')).toHaveLength(3);

  vi.advanceTimersByTime(400);
  expect(document.querySelector('[data-progress-fill]').style.width).toBe('100%');
  expect(document.querySelector('[data-screen-id="page3"]')).not.toBeNull();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run tests/funnel.test.js`
Expected: FAIL because page 2 has no timed behavior yet

- [ ] **Step 3: Write minimal implementation**

```js
import {
  CHECKLIST_DELAY_MS,
  PROGRESS_DURATION_MS,
} from './constants.js';

// inside FunnelApp
clearTimers() {
  this.timers?.forEach((timerId) => clearTimeout(timerId));
  this.timers = [];
}

goTo(screenId) {
  this.clearTimers();
  this.currentScreen = screenId;
  this.render();
}

bindCurrentScreen() {
  if (this.currentScreen === 'page1') {
    this.container.querySelectorAll('[data-age-option]').forEach((button) => {
      button.addEventListener('click', () => this.goTo('page2'));
    });
    return;
  }

  if (this.currentScreen === 'page2') {
    const items = [...this.container.querySelectorAll('[data-check-item]')];
    const progressFill = this.container.querySelector('[data-progress-fill]');

    items.forEach((item, index) => {
      const timerId = setTimeout(() => {
        item.classList.add('is-visible');
      }, CHECKLIST_DELAY_MS * (index + 1));
      this.timers.push(timerId);
    });

    progressFill.style.width = '0%';
    const progressTimer = setTimeout(() => {
      progressFill.style.width = '100%';
      this.goTo('page3');
    }, PROGRESS_DURATION_MS);
    this.timers.push(progressTimer);
  }
}
```

Patch `Page 2 FINAL` with stable hooks:

```html
data-screen-id="page2"
data-check-item
data-progress-fill
```

And add CSS:

```css
[data-check-item] { opacity: 0; }
[data-check-item].is-visible { opacity: 1; }
[data-progress-fill] { width: 0%; transition: width 2500ms linear; }
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- --run tests/funnel.test.js`
Expected: PASS with Screen 2 timing and auto-advance covered

### Task 5: Add Screen 3 countdown timer and CTA link wiring

**Files:**
- Modify: `src/funnel.js`
- Modify: `src/screens/page3.html`
- Test: `tests/funnel.test.js`

- [ ] **Step 1: Write the failing test**

```js
test('page 3 starts at 14:59 and counts down once per second', async () => {
  vi.useFakeTimers();
  document.body.innerHTML = '<div id="app"></div>';
  const { mountApp } = await import('../src/main.js');
  mountApp(document.getElementById('app'));

  document.querySelector('[data-age-option="21-plus"]').click();
  vi.advanceTimersByTime(2500);

  expect(document.querySelector('[data-screen-id="page3"]')).not.toBeNull();
  expect(document.querySelector('[data-countdown]').textContent).toBe('14:59');
  expect(document.querySelector('[data-install-cta]').getAttribute('href')).toBe('https://example.com/freecash-offer');

  vi.advanceTimersByTime(1000);
  expect(document.querySelector('[data-countdown]').textContent).toBe('14:58');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run tests/funnel.test.js`
Expected: FAIL because Screen 3 timer and CTA wiring do not exist yet

- [ ] **Step 3: Write minimal implementation**

```js
import {
  COUNTDOWN_START_SECONDS,
  CTA_URL,
} from './constants.js';

formatCountdown(totalSeconds) {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${minutes}:${seconds}`;
}

startCountdown() {
  const countdownNode = this.container.querySelector('[data-countdown]');
  const cta = this.container.querySelector('[data-install-cta]');
  let remaining = COUNTDOWN_START_SECONDS;

  countdownNode.textContent = this.formatCountdown(remaining);
  cta.setAttribute('href', CTA_URL);

  const intervalId = setInterval(() => {
    if (remaining === 0) return;
    remaining -= 1;
    countdownNode.textContent = this.formatCountdown(remaining);
  }, 1000);

  this.intervals.push(intervalId);
}
```

Also update teardown in `goTo()`:

```js
clearTimers() {
  this.timers?.forEach((timerId) => clearTimeout(timerId));
  this.intervals?.forEach((intervalId) => clearInterval(intervalId));
  this.timers = [];
  this.intervals = [];
}
```

And call `startCountdown()` when the current screen is `page3`.

Patch `Page 3 FINAL` with stable hooks:

```html
data-screen-id="page3"
data-countdown
data-install-cta
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- --run tests/funnel.test.js`
Expected: PASS with Screen 3 countdown and CTA link covered

### Task 6: Add shell CSS patches for faithful mobile presentation

**Files:**
- Create: `styles/app.css`
- Modify: `index.html`
- Test: `tests/funnel.test.js`

- [ ] **Step 1: Write the failing test**

```js
test('app shell constrains the funnel to a mobile viewport', async () => {
  const css = await import('../styles/app.css?inline');
  expect(css.default).toContain('max-width: 390px');
  expect(css.default).toContain('min-height: 100dvh');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run tests/funnel.test.js`
Expected: FAIL because `styles/app.css` does not exist yet

- [ ] **Step 3: Write minimal implementation**

```css
:root {
  color-scheme: dark;
}

* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  min-height: 100dvh;
  background: #101411;
}

body {
  display: flex;
  justify-content: center;
}

#app {
  width: 100%;
  max-width: 390px;
  min-height: 100dvh;
}

[data-funnel-root] {
  min-height: 100dvh;
}
```

If CSS import assertions are unsupported in tests, replace the CSS string assertion with a DOM assertion that `#app` renders and the stylesheet link exists in `index.html`.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- --run tests/funnel.test.js`
Expected: PASS with mobile shell styling present

### Task 7: Verify only the final CTA is external and the full flow works end-to-end

**Files:**
- Modify: `tests/funnel.test.js`

- [ ] **Step 1: Write the failing test**

```js
test('only the install CTA is an external link across the funnel', async () => {
  vi.useFakeTimers();
  document.body.innerHTML = '<div id="app"></div>';
  const { mountApp } = await import('../src/main.js');
  mountApp(document.getElementById('app'));

  expect([...document.querySelectorAll('a[href^="http"]')]).toHaveLength(0);

  document.querySelector('[data-age-option="21-plus"]').click();
  vi.advanceTimersByTime(2500);

  const links = [...document.querySelectorAll('a[href^="http"]')];
  expect(links).toHaveLength(1);
  expect(links[0].matches('[data-install-cta]')).toBe(true);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run tests/funnel.test.js`
Expected: FAIL until Screen 3 is the only external-link screen

- [ ] **Step 3: Write minimal implementation**

```js
// Remove or neutralize any external href values that arrive from the Stitch exports
// except the final CTA, which is set programmatically in startCountdown().
```

In each imported screen, replace any non-final external links with inert local targets:

```html
href="#"
```

or:

```html
type="button"
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- --run tests/funnel.test.js`
Expected: PASS with exactly one external link on page 3

## Self-Review

- Spec coverage:
  - Final-screen mapping is covered in Task 2.
  - Screen 1 dual-button routing is covered in Task 3.
  - Screen 2 timing and auto-advance are covered in Task 4.
  - Screen 3 countdown and CTA link are covered in Task 5.
  - Mobile fidelity shell and integration patches are covered in Task 6.
  - Only-one-external-link requirement is covered in Task 7.
- Placeholder scan:
  - The only variable content is the pasted Stitch HTML from the three final exports, which is explicitly identified and scoped to the source-of-truth assets.
  - Fallback notes are limited to tool/runtime compatibility around raw HTML/CSS imports.
- Type consistency:
  - Screen ids are `page1`, `page2`, `page3` throughout.
  - Timing constants are `CHECKLIST_DELAY_MS`, `PROGRESS_DURATION_MS`, and `COUNTDOWN_START_SECONDS` throughout.

