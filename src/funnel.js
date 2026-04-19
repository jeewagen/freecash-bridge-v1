import {
  CHECKLIST_DELAY_MS,
  COUNTDOWN_START_SECONDS,
  CTA_URL,
  PAGE2_CHECKMARK_PAUSE_MS,
  PAGE2_COMPLETION_HOLD_MS,
  PROGRESS_DURATION_MS,
} from './constants.js';
import { screenTemplates } from './screenTemplates.js';

export class FunnelApp {
  constructor(container) {
    this.container = container;
    this.currentScreen = 'page1';
    this.timers = [];
    this.intervals = [];
  }

  clearTimers() {
    this.timers.forEach((timerId) => clearTimeout(timerId));
    this.intervals.forEach((intervalId) => clearInterval(intervalId));
    this.timers = [];
    this.intervals = [];
  }

  formatCountdown(totalSeconds) {
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

  goTo(screenId) {
    this.clearTimers();
    this.currentScreen = screenId;
    this.render();
  }

  startChecklistSequence() {
    const items = [...this.container.querySelectorAll('[data-check-item]')];
    const progressFill = this.container.querySelector('[data-progress-fill]');
    const pageTwo = this.container.querySelector('[data-screen-id="page2"]');
    const loadingArc = this.container.querySelector('[data-loading-arc]');
    const loadingCheck = this.container.querySelector('[data-loading-check]');

    items.forEach((item, index) => {
      const timerId = setTimeout(() => {
        item.classList.add('is-visible');
        item.classList.add('is-complete');
      }, CHECKLIST_DELAY_MS * (index + 1));

      this.timers.push(timerId);
    });

    progressFill.style.width = '0%';

    const progressStartTimer = setTimeout(() => {
      progressFill.style.width = '100%';
    }, 50);

    const completionBeatTimer = setTimeout(() => {
      pageTwo.classList.add('is-completing');
      loadingArc.classList.add('is-complete');
      loadingCheck.classList.add('is-visible');
    }, PROGRESS_DURATION_MS);

    const exitTimer = setTimeout(() => {
      pageTwo.classList.add('is-exiting');
    }, PROGRESS_DURATION_MS + PAGE2_CHECKMARK_PAUSE_MS);

    const progressCompleteTimer = setTimeout(() => {
      this.goTo('page3');
    }, PROGRESS_DURATION_MS + PAGE2_COMPLETION_HOLD_MS);

    this.timers.push(progressStartTimer, completionBeatTimer, exitTimer, progressCompleteTimer);
  }

  startCountdown() {
    const countdownNode = this.container.querySelector('[data-countdown]');
    const ctaNode = this.container.querySelector('[data-install-cta]');

    let remaining = COUNTDOWN_START_SECONDS;

    countdownNode.textContent = this.formatCountdown(remaining);
    ctaNode.setAttribute('href', CTA_URL);

    const intervalId = setInterval(() => {
      if (remaining === 0) {
        return;
      }

      remaining -= 1;
      countdownNode.textContent = this.formatCountdown(remaining);
    }, 1000);

    this.intervals.push(intervalId);
  }

  startLiveEarnersTicker() {
    const countNode = this.container.querySelector('[data-live-count]');

    if (!countNode) {
      return;
    }

    let current = Number(countNode.textContent.replace(/,/g, ''));

    const intervalId = setInterval(() => {
      const delta = Math.floor(Math.random() * 7) + 1;
      current += delta;
      countNode.textContent = current.toLocaleString('en-US');
      countNode.classList.add('is-updating');

      const pulseReset = setTimeout(() => {
        countNode.classList.remove('is-updating');
      }, 550);

      this.timers.push(pulseReset);
    }, 3200);

    this.intervals.push(intervalId);
  }

  bindCurrentScreen() {
    if (this.currentScreen === 'page1') {
      this.container.querySelectorAll('[data-age-option]').forEach((button) => {
        button.addEventListener('click', () => this.goTo('page2'));
      });
      this.startLiveEarnersTicker();
      return;
    }

    if (this.currentScreen === 'page2') {
      this.startChecklistSequence();
      return;
    }

    if (this.currentScreen === 'page3') {
      this.startCountdown();
    }
  }

  render() {
    this.container.innerHTML = `
      <div data-funnel-root class="app-shell">
        ${screenTemplates[this.currentScreen]}
      </div>
    `;

    this.bindCurrentScreen();
  }
}
