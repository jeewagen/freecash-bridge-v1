import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

beforeEach(() => {
  vi.resetModules();
  vi.useRealTimers();
  document.body.innerHTML = '';
  delete window.posthog;
  delete window.fbq;
  delete globalThis.fbq;
});

afterEach(() => {
  vi.useRealTimers();
});

describe('app bootstrap', () => {
  test('mounts a funnel root container', async () => {
    document.body.innerHTML = '<div id="app"></div>';
    const { mountApp } = await import('../src/main.js');

    mountApp(document.getElementById('app'));

    expect(document.querySelector('[data-funnel-root]')).not.toBeNull();
  });

  test('exposes all three final screen templates', async () => {
    const { screenTemplates } = await import('../src/screenTemplates.js');

    expect(Object.keys(screenTemplates)).toEqual(['page1', 'page2', 'page3']);
    expect(screenTemplates.page1.length).toBeGreaterThan(100);
    expect(screenTemplates.page2.length).toBeGreaterThan(100);
    expect(screenTemplates.page3.length).toBeGreaterThan(100);
  });

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

  test('page 2 reveals checklist items, fills progress, and auto-advances', async () => {
    vi.useFakeTimers();
    document.body.innerHTML = '<div id="app"></div>';
    const { mountApp } = await import('../src/main.js');

    mountApp(document.getElementById('app'));
    document.querySelector('[data-age-option="21-plus"]').click();

    expect(document.querySelector('[data-screen-id="page2"]')).not.toBeNull();
    expect(document.querySelectorAll('[data-check-item].is-visible')).toHaveLength(0);
    expect(document.querySelector('[data-progress-fill]').style.width).toBe('0%');

    vi.advanceTimersByTime(350);
    expect(document.querySelectorAll('[data-check-item].is-visible')).toHaveLength(1);
    expect(document.querySelectorAll('[data-check-item].is-complete')).toHaveLength(1);

    vi.advanceTimersByTime(700);
    expect(document.querySelectorAll('[data-check-item].is-visible')).toHaveLength(3);
    expect(document.querySelectorAll('[data-check-item].is-complete')).toHaveLength(3);
    expect(document.querySelector('[data-progress-fill]').style.width).toBe('100%');
    expect(document.querySelector('[data-screen-id="page2"]').classList.contains('is-completing')).toBe(false);

    vi.advanceTimersByTime(200);
    expect(document.querySelector('[data-progress-fill]').style.width).toBe('100%');
    expect(document.querySelector('[data-screen-id="page2"]').classList.contains('is-completing')).toBe(true);
    expect(document.querySelector('[data-loading-arc]').classList.contains('is-complete')).toBe(true);
    expect(document.querySelector('[data-loading-check]').classList.contains('is-visible')).toBe(true);

    vi.advanceTimersByTime(125);
    expect(document.querySelector('[data-screen-id="page2"]')).not.toBeNull();
    expect(document.querySelector('[data-screen-id="page2"]').classList.contains('is-exiting')).toBe(false);

    vi.advanceTimersByTime(50);
    expect(document.querySelector('[data-screen-id="page2"]')).not.toBeNull();
    expect(document.querySelector('[data-screen-id="page2"]').classList.contains('is-exiting')).toBe(true);

    vi.advanceTimersByTime(150);
    expect(document.querySelector('[data-screen-id="page3"]')).not.toBeNull();
  });

  test('screen transitions reset the page scroll to the top', async () => {
    vi.useFakeTimers();
    document.body.innerHTML = '<div id="app"></div>';
    const userAgentSpy = vi.spyOn(window.navigator, 'userAgent', 'get').mockReturnValue('Mozilla/5.0');
    const scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    const { mountApp } = await import('../src/main.js');

    mountApp(document.getElementById('app'));
    scrollToSpy.mockClear();

    document.querySelector('[data-age-option="21-plus"]').click();
    expect(scrollToSpy).toHaveBeenCalledWith(0, 0);

    scrollToSpy.mockClear();
    vi.advanceTimersByTime(1600);
    expect(document.querySelector('[data-screen-id="page3"]')).not.toBeNull();
    expect(scrollToSpy).toHaveBeenCalledWith(0, 0);

    userAgentSpy.mockRestore();
  });

  test('page 2 uses the tightened review copy and removes the step pill', async () => {
    const { screenTemplates } = await import('../src/screenTemplates.js');

    expect(screenTemplates.page2).toContain('Checking Eligibility');
    expect(screenTemplates.page2).toContain('Checking offer availability...');
    expect(screenTemplates.page2).toContain('Reserving your welcome bonus...');
    expect(screenTemplates.page2).not.toContain('02/03');
    expect(screenTemplates.page2).not.toContain('Analyzing your responses...');
  });

  test('page 3 starts at 14:59 and counts down once per second', async () => {
    vi.useFakeTimers();
    document.body.innerHTML = '<div id="app"></div>';
    const { mountApp } = await import('../src/main.js');

    mountApp(document.getElementById('app'));
    document.querySelector('[data-age-option="21-plus"]').click();
    vi.advanceTimersByTime(1560);

    expect(document.querySelector('[data-screen-id="page3"]')).not.toBeNull();
    expect(document.querySelector('[data-countdown]').textContent).toBe('14:59');
    expect(document.body.textContent).toContain('YOUR BONUS RESERVED FOR');
    expect(document.querySelector('[data-install-cta]').getAttribute('href')).toBe('https://trk.dailyearndrop.com/cf/click');
    expect(document.querySelector('[data-install-cta-secondary]').getAttribute('href')).toBe('https://trk.dailyearndrop.com/cf/click');

    vi.advanceTimersByTime(1000);
    expect(document.querySelector('[data-countdown]').textContent).toBe('14:58');
  });

  test('tracks the core funnel steps in PostHog', async () => {
    vi.useFakeTimers();
    document.body.innerHTML = '<div id="app"></div>';
    window.posthog = { capture: vi.fn() };
    window.fbq = vi.fn();
    globalThis.fbq = window.fbq;
    const { mountApp } = await import('../src/main.js');

    mountApp(document.getElementById('app'));

    expect(window.posthog.capture).toHaveBeenCalledWith('funnel page viewed', {
      screen: 'page1',
    });

    window.posthog.capture.mockClear();
    document.querySelector('[data-age-option="21-plus"]').click();

    expect(window.posthog.capture).toHaveBeenCalledWith('funnel age selected', {
      screen: 'page1',
      age_option: '21-plus',
    });
    expect(window.posthog.capture).toHaveBeenCalledWith('funnel page viewed', {
      screen: 'page2',
    });

    window.posthog.capture.mockClear();
    vi.advanceTimersByTime(1600);

    expect(window.posthog.capture).toHaveBeenCalledWith('funnel page2 completed', {
      screen: 'page2',
    });
    expect(window.posthog.capture).toHaveBeenCalledWith('funnel page viewed', {
      screen: 'page3',
    });

    window.posthog.capture.mockClear();
    const primaryCta = document.querySelector('[data-install-cta]');
    const secondaryCta = document.querySelector('[data-install-cta-secondary]');
    primaryCta.onclick = null;
    secondaryCta.onclick = null;
    primaryCta.dispatchEvent(new Event('click', { bubbles: true }));
    secondaryCta.dispatchEvent(new Event('click', { bubbles: true }));

    expect(window.posthog.capture).toHaveBeenCalledWith('funnel cta clicked', {
      screen: 'page3',
      button_position: 'primary',
    });
    expect(window.posthog.capture).toHaveBeenCalledWith('funnel cta clicked', {
      screen: 'page3',
      button_position: 'secondary',
    });
  });

  test('page 3 CTA uses the updated copy with the shared soft glow treatment', async () => {
    const { screenTemplates } = await import('../src/screenTemplates.js');

    expect(screenTemplates.page3).toContain('Claim My $20 - Start Now for Free');
    expect(screenTemplates.page3).toContain('data-primary-glow');
    expect(screenTemplates.page3).toContain(`onclick="fbq('track', 'InitiateCheckout')"`);
    expect(screenTemplates.page3).toContain('w-full space-y-4 mb-0');
    expect(screenTemplates.page3).toContain('w-full h-16 bg-[#00e87a]');
    expect(screenTemplates.page3).not.toContain('Claim My $20 — Download Free');
    expect(screenTemplates.page3).not.toContain('Available on iOS &amp; Android · Takes under 60 seconds');
  });

  test('page 3 steps section uses stronger follow-through copy with an estimated time badge', async () => {
    const { screenTemplates } = await import('../src/screenTemplates.js');

    expect(screenTemplates.page3).toContain('Follow These Steps To Cash Out Your Welcome Bonus');
    expect(screenTemplates.page3).toContain('EST. 5-10 MIN');
    expect(screenTemplates.page3).toContain('IMPORTANT TIP');
    expect(screenTemplates.page3).toContain('border-[#7a4b12]');
    expect(screenTemplates.page3).toContain('bg-[#111614]');
    expect(screenTemplates.page3).toContain('rounded-[18px] border border-[#7a4b12]');
    expect(screenTemplates.page3).toContain('Create your account');
    expect(screenTemplates.page3).toContain('Using either buttons on this page');
    expect(screenTemplates.page3).toContain("Don't stop there");
    expect(screenTemplates.page3).toContain('Keep making more by doing more offers');
    expect(screenTemplates.page3).toContain('OPTIONAL');
    expect(screenTemplates.page3).toContain('Claim My Bonus Now');
    expect(screenTemplates.page3).toContain('bg-[#f5a623]');
    expect(screenTemplates.page3).toContain('text-[#f5a623] font-black text-[15px] leading-none mt-1');
    expect(screenTemplates.page3).toContain('w-full h-14 bg-[#f5a623]');
    expect(screenTemplates.page3).toContain('text-lg leading-none pt-1');
    expect(screenTemplates.page3).toContain('font-body text-white font-bold text-base mb-1');
    expect(screenTemplates.page3).toContain('space-y-6');
    expect(screenTemplates.page3).not.toContain('</div>\n\n           <div class="space-y-8">');
    expect(screenTemplates.page3).not.toContain('How it works');
  });

  test('page 3 no longer includes the separate bonus unlock card', async () => {
    const { screenTemplates } = await import('../src/screenTemplates.js');

    expect(screenTemplates.page3).not.toContain('Bonus Unlock Available');
    expect(screenTemplates.page3).not.toContain('your $20 welcome bonus activates automatically');
  });

  test('page 3 uses the same live earners footer treatment as page 1 instead of trust text', async () => {
    const { screenTemplates } = await import('../src/screenTemplates.js');

    expect(screenTemplates.page3).toContain('data-live-earners');
    expect(screenTemplates.page3).toContain('Trusted by <span data-live-count class="text-[#00e87a] font-black">500,593</span> earners worldwide');
    expect(screenTemplates.page3).toContain('bg-[#111614] border-t border-white/5 px-6 py-3.5 flex items-center justify-center gap-2.5');
    expect(screenTemplates.page3).toContain('mt-8 -mx-1');
    expect(screenTemplates.page3).toContain('section class="w-full mb-0"');
    expect(screenTemplates.page3).toContain('mt-auto w-full pt-[40px]');
    expect(screenTemplates.page3).not.toContain('Trusted by 500,000+ users earning daily');
  });

  test('page 3 uses the same welcome bonus header treatment as page 1 without fixed positioning', async () => {
    const { screenTemplates } = await import('../src/screenTemplates.js');

    expect(screenTemplates.page3).toContain('data-page3-bonus-header');
    expect(screenTemplates.page3).toContain('bg-[#00e87a]');
    expect(screenTemplates.page3).toContain('$20 WELCOME BONUS — NEW USERS ONLY');
    expect(screenTemplates.page3).not.toContain('fixed top-0');
    expect(screenTemplates.page3).toContain('pt-6 mb-8');
    expect(screenTemplates.page3).toContain('px-6 pb-0');
  });

  test('page 3 reserved bonus sentence is slightly heavier and white', async () => {
    const { screenTemplates } = await import('../src/screenTemplates.js');

    expect(screenTemplates.page3).toContain(
      '<span class="text-white">Your $20 bonus is reserved.</span> Sign up via the button below to activate it before your spot expires.'
    );
  });

  test('only the install CTA is an external link across the funnel', async () => {
    vi.useFakeTimers();
    document.body.innerHTML = '<div id="app"></div>';
    const { mountApp } = await import('../src/main.js');

    mountApp(document.getElementById('app'));

    expect([...document.querySelectorAll('a[href^="http"]')]).toHaveLength(0);

    document.querySelector('[data-age-option="21-plus"]').click();
    vi.advanceTimersByTime(3200);

    const links = [...document.querySelectorAll('a[href^="http"]')];
    expect(links).toHaveLength(2);
    expect(links.some((link) => link.matches('[data-install-cta]'))).toBe(true);
    expect(links.some((link) => link.matches('[data-install-cta-secondary]'))).toBe(true);
  });

  test('page 1 uses the refreshed earnings layout and live footer copy', async () => {
    document.body.innerHTML = '<div id="app"></div>';
    const { mountApp } = await import('../src/main.js');

    mountApp(document.getElementById('app'));

    expect(document.querySelector('[data-screen-id="page1"]')).not.toBeNull();
    expect(document.querySelector('[data-rating-badge]')).not.toBeNull();
    expect(document.querySelector('[data-earnings-header]')).not.toBeNull();
    expect(document.querySelector('[data-verified-payouts]')).not.toBeNull();
    expect(document.querySelector('[data-live-earners]')).not.toBeNull();
    expect(document.querySelector('[data-live-count]')).not.toBeNull();
    expect(document.querySelector('[data-primary-glow]')).not.toBeNull();
    expect(document.querySelector('[data-play-glow]')).not.toBeNull();
    expect(document.querySelector('[data-bonus-pill]')).not.toBeNull();
    expect(document.querySelector('[data-verified-payouts]').className).not.toContain('border-white');
    expect(document.querySelector('[data-live-earners]').className).not.toContain('rounded-b');
    expect(document.querySelector('[data-live-dot]')).not.toBeNull();
    expect(document.querySelector('[data-live-icon]')).not.toBeNull();
    expect(document.body.textContent).toContain(
      'Earn real money for things you already do on your phone. Cash out instantly via PayPal, Venmo, or CashApp.'
    );
    expect(document.body.textContent).toContain('RECENT EARNINGS');
    expect(document.body.textContent).toContain('Trusted by');
    expect(document.body.textContent).toContain('earners worldwide');
  });

  test('page 1 live footer ticker updates slowly and pulses on change', async () => {
    vi.useFakeTimers();
    document.body.innerHTML = '<div id="app"></div>';
    const { mountApp } = await import('../src/main.js');

    mountApp(document.getElementById('app'));

    const countNode = document.querySelector('[data-live-count]');
    const startValue = countNode.textContent;

    vi.advanceTimersByTime(2500);
    expect(countNode.textContent).toBe(startValue);

    vi.advanceTimersByTime(1200);
    expect(countNode.textContent).not.toBe(startValue);
    expect(countNode.classList.contains('is-updating')).toBe(true);
  });

  test('page 1 primary button keeps the original green fill while using the glow hook', async () => {
    document.body.innerHTML = '<div id="app"></div>';
    const { mountApp } = await import('../src/main.js');

    mountApp(document.getElementById('app'));

    const primaryButton = document.querySelector('[data-primary-glow]');

    expect(primaryButton).not.toBeNull();
    expect(primaryButton.className).toContain('bg-[#00e87a]');
    expect(primaryButton.className).not.toContain('overflow-hidden');
    expect(primaryButton.querySelector('.absolute')).toBeNull();
  });

  test('page 1 testimonial and footer accents use the funnel green token', async () => {
    document.body.innerHTML = '<div id="app"></div>';
    const { screenTemplates } = await import('../src/screenTemplates.js');

    expect(screenTemplates.page1).toContain('text-[#00e87a] font-bold text-[16px] tracking-tight');
    expect(screenTemplates.page1).toContain('text-[#00e87a] font-bold headline-font');
    expect(screenTemplates.page1).toContain('bg-[#00e87a] shadow-[0_0_0_4px_rgba(0,232,122,0.08)');
    expect(screenTemplates.page1).not.toContain('#39ff14');
  });

  test('page 1 testimonial amount labels sit tightly with no manual left margin', async () => {
    const { screenTemplates } = await import('../src/screenTemplates.js');

    expect(screenTemplates.page1).not.toContain(' ml-1');
  });

  test('page 1 testimonial cards use true circular avatars and quoted full-width copy', async () => {
    const { screenTemplates } = await import('../src/screenTemplates.js');

    expect(screenTemplates.page1).toContain('rounded-full border border-[#1c6a2f]');
    expect(screenTemplates.page1).toContain('shrink-0');
    expect(screenTemplates.page1).toContain('min-w-0 flex-1');
    expect(screenTemplates.page1).toContain('&ldquo;');
  });

  test('page 1 testimonial quotes span the full card width below the header row', async () => {
    const { screenTemplates } = await import('../src/screenTemplates.js');

    expect(screenTemplates.page1).toContain('col-span-2');
    expect(screenTemplates.page1).toContain('grid grid-cols-[auto_1fr]');
  });

  test('page 1 verified payouts badge uses the same green border token as the testimonial avatar', async () => {
    const { screenTemplates } = await import('../src/screenTemplates.js');

    expect(screenTemplates.page1).toContain('data-verified-payouts class="flex items-center gap-1.5 bg-[#00e87a]/10 px-2.5 py-1 rounded-md border border-[#1c6a2f]"');
  });

  test('page 1 earnings header row bottom-aligns the label with the verified badge', async () => {
    const { screenTemplates } = await import('../src/screenTemplates.js');

    expect(screenTemplates.page1).toContain('flex items-end justify-between');
  });

  test('page 1 verified payouts badge uses the tighter small sizing', async () => {
    const { screenTemplates } = await import('../src/screenTemplates.js');

    expect(screenTemplates.page1).toContain('data-verified-payouts class="flex items-center gap-1.5 bg-[#00e87a]/10 px-2.5 py-1 rounded-md border border-[#1c6a2f]"');
    expect(screenTemplates.page1).toContain('text-[10px] font-bold');
  });

  test('page 1 welcome bonus row uses tighter spacing and 11px pill text', async () => {
    const { screenTemplates } = await import('../src/screenTemplates.js');

    expect(screenTemplates.page1).toContain('data-entrance="hero-top"');
    expect(screenTemplates.page1).toContain('class="flex flex-row items-center justify-center gap-2 mb-9"');
    expect(screenTemplates.page1).toContain('text-[11px] font-semibold');
  });

  test('page 1 welcome bonus row has a bit more bottom spacing before the hero cluster', async () => {
    const { screenTemplates } = await import('../src/screenTemplates.js');

    expect(screenTemplates.page1).toContain('data-entrance="hero-top" class="flex flex-row items-center justify-center gap-2 mb-9"');
  });

  test('page 1 includes staggered entrance animation hooks for premium motion', async () => {
    const { screenTemplates } = await import('../src/screenTemplates.js');
    const css = await readFile(path.join(process.cwd(), 'styles/app.css'), 'utf8');

    expect(screenTemplates.page1).toContain('data-entrance="hero-top"');
    expect(screenTemplates.page1).toContain('data-entrance="hero-main"');
    expect(screenTemplates.page1).toContain('data-entrance="earnings"');
    expect(screenTemplates.page1).toContain('data-entrance="selector"');
    expect(screenTemplates.page1).toContain('data-entrance="footer"');
    expect(css).toContain('[data-screen-id="page1"] [data-entrance]');
    expect(css).toContain('animation: pageEntrance');
    expect(css).toContain('transform: translateY(8px)');
    expect(css).toContain('animation-delay: 0.02s');
    expect(css).toContain('animation-delay: 0.25s');
  });
});
