export const screenTemplates = {
  page1: `
    <main data-screen-id="page1" class="flex-grow min-h-screen px-6 pt-10 pb-0 flex flex-col items-center">
      <header data-entrance="hero-top" class="flex flex-row items-center justify-center gap-2 mb-9">
        <div class="flex items-center justify-center w-7 h-7 rounded-full bg-[#00e87a]">
          <span class="material-symbols-outlined text-[#003919] text-lg" style="font-variation-settings: 'FILL' 1;">monetization_on</span>
        </div>
        <div data-bonus-pill class="inline-flex items-center gap-2 px-3 py-1.5 bg-[#181d19] rounded-full border border-[#1f2820] whitespace-nowrap">
          <div class="w-1.5 h-1.5 rounded-full bg-[#00e87a] animate-pulse"></div>
          <span class="text-[11px] font-semibold tracking-[0.08em] text-white/92 uppercase">$20 WELCOME BONUS — NEW USERS ONLY</span>
        </div>
      </header>

      <div data-entrance="hero-main" class="w-full text-center mb-9">
        <div data-rating-badge class="flex items-center justify-center gap-1.5 mb-4">
          <div class="flex items-center gap-0.5">
            <span class="material-symbols-outlined text-[#f5a623] text-sm" style="font-variation-settings: 'FILL' 1;">star</span>
            <span class="material-symbols-outlined text-[#f5a623] text-sm" style="font-variation-settings: 'FILL' 1;">star</span>
            <span class="material-symbols-outlined text-[#f5a623] text-sm" style="font-variation-settings: 'FILL' 1;">star</span>
            <span class="material-symbols-outlined text-[#f5a623] text-sm" style="font-variation-settings: 'FILL' 1;">star</span>
            <span class="material-symbols-outlined text-[#f5a623] text-sm" style="font-variation-settings: 'FILL' 1;">star</span>
          </div>
          <span class="text-white font-bold text-sm">4.8</span>
          <span class="text-[#7a9080] text-sm">· 25K+ ratings</span>
        </div>

        <div class="space-y-3">
          <h1 class="headline-font text-[3.2rem] font-bold tracking-tight text-white leading-[1.1]">
            Get Paid to Scroll &amp; <span data-play-glow class="text-[#00e87a] inline-block">Play</span>
          </h1>
          <p class="text-[#7a9080] font-medium leading-[1.5] max-w-[310px] mx-auto">
            Earn real money for things you already do on your phone. Cash out instantly via PayPal, Venmo, or CashApp.
          </p>
        </div>
      </div>

      <div data-entrance="earnings" class="w-full mb-9">
        <div class="flex items-end justify-between mb-3.5">
          <span data-earnings-header class="text-[11px] font-light tracking-[0.22em] text-[#93a394] uppercase">RECENT EARNINGS</span>
          <div data-verified-payouts class="flex items-center gap-1.5 bg-[#00e87a]/10 px-2.5 py-1 rounded-md border border-[#1c6a2f]">
            <span class="material-symbols-outlined text-[#00e87a] text-xs" style="font-variation-settings: 'FILL' 1;">verified</span>
            <span class="text-[#00e87a] text-[10px] font-bold tracking-[0.18em] uppercase">Verified Payouts</span>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-3.5 w-full">
          <div class="bg-[#111614] border border-[#1f2820] px-4 py-4 rounded-[14px] grid grid-cols-[auto_1fr] items-start gap-x-3.5 gap-y-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
            <div class="shrink-0 w-9 h-9 rounded-full border border-[#1c6a2f] bg-[#0d2513] flex items-center justify-center text-[#00e87a] font-bold headline-font text-[14px] shadow-[0_0_0_1px_rgba(0,232,122,0.08),0_0_14px_rgba(0,232,122,0.08)]">AJ</div>
            <div class="min-w-0 flex-1">
              <div class="flex items-start justify-between gap-3">
                <div>
                  <div class="text-white font-bold text-[15px] leading-none">Aaliyah J.</div>
                  <div class="flex mt-2">
                    <span class="material-symbols-outlined text-[#f5a623] text-[11px]" style="font-variation-settings: 'FILL' 1;">star</span>
                    <span class="material-symbols-outlined text-[#f5a623] text-[11px]" style="font-variation-settings: 'FILL' 1;">star</span>
                    <span class="material-symbols-outlined text-[#f5a623] text-[11px]" style="font-variation-settings: 'FILL' 1;">star</span>
                    <span class="material-symbols-outlined text-[#f5a623] text-[11px]" style="font-variation-settings: 'FILL' 1;">star</span>
                    <span class="material-symbols-outlined text-[#f5a623] text-[11px]" style="font-variation-settings: 'FILL' 1;">star</span>
                  </div>
                </div>
                <div class="text-right whitespace-nowrap">
                  <span class="text-[#00e87a] font-bold text-[16px] tracking-tight">$47</span>
                  <span class="text-[#7a9080] text-[14px] font-medium">in 2 hours</span>
                </div>
              </div>
            </div>
            <p class="col-span-2 text-[#8a958b] text-[13px] leading-[1.55]">&ldquo;Couldn't believe how fast it worked. Got paid same day.&rdquo;</p>
          </div>

          <div class="bg-[#111614] border border-[#1f2820] px-4 py-4 rounded-[14px] grid grid-cols-[auto_1fr] items-start gap-x-3.5 gap-y-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
            <div class="shrink-0 w-9 h-9 rounded-full border border-[#1c6a2f] bg-[#0d2513] flex items-center justify-center text-[#00e87a] font-bold headline-font text-[14px] shadow-[0_0_0_1px_rgba(0,232,122,0.08),0_0_14px_rgba(0,232,122,0.08)]">MR</div>
            <div class="min-w-0 flex-1">
              <div class="flex items-start justify-between gap-3">
                <div>
                  <div class="text-white font-bold text-[15px] leading-none">Maria R.</div>
                  <div class="flex mt-2">
                    <span class="material-symbols-outlined text-[#f5a623] text-[11px]" style="font-variation-settings: 'FILL' 1;">star</span>
                    <span class="material-symbols-outlined text-[#f5a623] text-[11px]" style="font-variation-settings: 'FILL' 1;">star</span>
                    <span class="material-symbols-outlined text-[#f5a623] text-[11px]" style="font-variation-settings: 'FILL' 1;">star</span>
                    <span class="material-symbols-outlined text-[#f5a623] text-[11px]" style="font-variation-settings: 'FILL' 1;">star</span>
                    <span class="material-symbols-outlined text-[#f5a623] text-[11px]" style="font-variation-settings: 'FILL' 1;">star</span>
                  </div>
                </div>
                <div class="text-right whitespace-nowrap">
                  <span class="text-[#00e87a] font-bold text-[16px] tracking-tight">$120</span>
                  <span class="text-[#7a9080] text-[14px] font-medium">this week</span>
                </div>
              </div>
            </div>
            <p class="col-span-2 text-[#8a958b] text-[13px] leading-[1.55]">&ldquo;I do surveys on my lunch break. It actually adds up.&rdquo;</p>
          </div>
        </div>
      </div>

      <div data-entrance="selector" class="space-y-4 w-full">
        <div class="flex flex-col items-center">
          <div class="w-full h-px bg-[#1f2820] mb-5"></div>
          <span class="text-[10px] font-medium tracking-widest text-[#7a9080] uppercase">Select your age to unlock payout options</span>
        </div>

        <div class="space-y-4">
          <button data-age-option="21-plus" data-primary-glow type="button" class="w-full bg-[#00e87a] hover:opacity-95 active:scale-[0.98] transition-all duration-100 p-5 rounded-xl text-left flex flex-col items-start gap-1.5 shadow-lg shadow-[#00e87a]/10">
            <span class="text-[#003919] font-black text-lg headline-font leading-none">I'm 21 or older</span>
            <span class="text-[#003919]/70 text-[10px] font-bold uppercase tracking-wide">Instant payouts: PayPal, CashApp, Venmo, Crypto</span>
          </button>
          <button data-age-option="under-21" type="button" class="w-full bg-[#111614] border border-[#1f2820] hover:bg-[#181d19] active:scale-[0.98] transition-all duration-100 p-5 rounded-xl text-left flex flex-col items-start gap-1.5">
            <span class="text-white font-black text-lg headline-font leading-none">I'm under 21</span>
            <span class="text-[#7a9080] text-[10px] font-bold uppercase tracking-wide">Still eligible — standard payouts available</span>
          </button>
        </div>

        <div data-entrance="footer" class="mt-auto w-full pt-6">
        <div data-live-earners class="-mx-6 bg-[#111614] border-t border-white/5 px-6 py-3.5 flex items-center justify-center gap-2.5">
          <span data-live-dot class="w-3 h-3 rounded-full bg-[#00e87a] shadow-[0_0_0_4px_rgba(0,232,122,0.08),0_0_10px_rgba(0,232,122,0.3)] animate-pulse"></span>
          <span data-live-icon class="material-symbols-outlined text-[#8a958b] text-[18px]">group</span>
          <p class="text-[#8a958b] text-[13px] leading-none">
            Trusted by <span data-live-count class="text-[#00e87a] font-black">500,593</span> earners worldwide
          </p>
        </div>
        </div>
      </div>
    </main>
    <div class="fixed inset-0 pointer-events-none -z-10 opacity-20">
      <div class="absolute inset-0 bg-[#0a0e0b]"></div>
    </div>
  `,
  page2: `
    <div data-screen-id="page2" class="bg-[#0a0e0b] text-on-surface font-body selection:bg-primary-container selection:text-on-primary">
      <header class="fixed top-0 flex items-center px-6 py-4 w-full max-w-[390px] bg-[#0a0e0b] z-50">
        <div class="text-xl font-bold text-white font-headline"></div>
      </header>

      <main class="min-h-screen flex flex-col pt-24 pb-32 px-6 max-w-md mx-auto relative overflow-hidden">
        <div class="flex flex-col items-center text-center space-y-6 mt-4">
          <h1 class="text-[2rem] font-headline font-bold tracking-tight text-white leading-[1.1]">
            Checking Eligibility
          </h1>
          <div class="relative py-3">
            <div data-loading-indicator class="loading-indicator">
              <div data-loading-arc class="loading-arc animate-spin"></div>
              <div data-loading-check class="loading-check">
                <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">check</span>
              </div>
            </div>
          </div>
        </div>

        <div data-checklist-group class="mt-10 space-y-4 w-full">
          <div data-check-item class="flex items-center gap-3">
            <div class="flex-shrink-0">
              <span class="material-symbols-outlined text-[#00e87a]" style="font-variation-settings: 'FILL' 1;">check_circle</span>
            </div>
            <p class="text-[#00e87a] font-medium text-[1.05rem]">Verifying eligibility...</p>
          </div>
          <div data-check-item class="flex items-center gap-3">
            <div class="flex-shrink-0">
              <span class="material-symbols-outlined text-[#00e87a]" style="font-variation-settings: 'FILL' 1;">check_circle</span>
            </div>
            <p class="text-[#00e87a] font-medium text-[1.05rem]">Checking offer availability...</p>
          </div>
          <div data-check-item class="flex items-center gap-3">
            <div class="flex-shrink-0">
              <span class="material-symbols-outlined text-[#00e87a]" style="font-variation-settings: 'FILL' 1;">check_circle</span>
            </div>
            <p class="text-[#00e87a] font-medium text-[1.05rem]">Reserving your welcome bonus...</p>
          </div>
        </div>

        <div class="mt-auto">
          <div data-page2-fact-card class="bg-[#111614] border border-[#1f2820] rounded-xl p-6 space-y-3 relative overflow-hidden">
            <div class="absolute inset-0 opacity-[0.03] pointer-events-none" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBDRlnmyF0oOEcyLCW4y_z-vUKpc7nIlnyM5L2yQqrwogBBXJU74HEkccMXai4LMFehEBef5HzivDqELzigt4v6P1FL0sLn2xICllGw_JAFt7TRWASDW8lw50A290NSMUGVOqInuv7FXLwWGWXXO_kv5f6HPbXN5wjsmUZ8F_1yXvCyeCBbw-94AeTvSGW1WG8ReN94vf12_nMqCpX7mFbC5WwiaAQmbdkPbZIh8mkeFde0XOIgxzHEfpwZsRAx0EpPR8_Z0gPp4iG6');"></div>
            <p class="font-label text-[10px] font-bold tracking-[0.2em] text-[#7a9080] uppercase">DID YOU KNOW?</p>
            <p class="font-headline text-lg font-bold text-white leading-snug">
              Freecash users cashed out over $50,000,000 in total earnings
            </p>
            <div class="flex flex-wrap gap-2 pt-1">
              <p class="text-[#7a9080] text-xs font-medium tracking-wide">
                PayPal · CashApp · Venmo · Crypto · and more
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer class="fixed bottom-0 w-full max-w-[390px] z-50 flex flex-col items-center pt-4 px-6 bg-[#0a0e0b]/80 backdrop-blur-md pb-6">
        <div data-progress-track class="w-full max-w-md rounded-full overflow-hidden h-[4px] bg-[#1f2820]">
          <div data-progress-fill class="h-full rounded-full bg-[#00e87a]"></div>
        </div>
      </footer>
    </div>
  `,
  page3: `
    <div data-screen-id="page3" class="bg-[#0a0e0b] text-on-surface min-h-screen flex flex-col items-center">
      <header data-page3-bonus-header class="w-full px-6 pt-6 mb-8 flex justify-center">
        <div class="flex flex-row items-center justify-center gap-2">
          <div class="flex items-center justify-center w-7 h-7 rounded-full bg-[#00e87a]">
            <span class="material-symbols-outlined text-[#003919] text-lg" style="font-variation-settings: 'FILL' 1;">monetization_on</span>
          </div>
          <div class="inline-flex items-center gap-2 px-3 py-1.5 bg-[#181d19] rounded-full border border-[#1f2820] whitespace-nowrap">
            <div class="w-1.5 h-1.5 rounded-full bg-[#00e87a] animate-pulse"></div>
            <span class="text-[11px] font-semibold tracking-[0.08em] text-white/92 uppercase">$20 WELCOME BONUS — NEW USERS ONLY</span>
          </div>
        </div>
      </header>

      <main class="w-full max-w-md px-6 pb-0 flex flex-col items-center">
        <div class="flex flex-col items-center text-center mb-10">
          <div class="w-16 h-16 bg-[#00e87a] rounded-full flex items-center justify-center mb-6">
            <span class="material-symbols-outlined text-[#003919] text-4xl" style="font-variation-settings: 'FILL' 1;">check</span>
          </div>
          <h1 class="text-4xl font-bold tracking-tight text-white mb-3">
            You're <span class="text-[#00e87a]">In!</span>
          </h1>
          <p class="text-[#7a9080] text-base leading-relaxed max-w-[280px]">
            <span class="text-white">Your $20 bonus is reserved.</span> Sign up via the button below to activate it before your spot expires.
          </p>
        </div>

        <div class="flex items-center gap-3 mb-8 py-3 px-6 bg-[#181d19] rounded-full border border-[#1f2820]">
          <span class="text-[11px] font-bold uppercase tracking-[0.2em] text-[#7a9080]">YOUR BONUS RESERVED FOR</span>
          <span data-countdown class="text-[#f5a623] font-black tabular-nums text-base">14:59</span>
        </div>

        <div class="w-full space-y-4 mb-0">
          <a data-install-cta data-primary-glow href="#" class="w-full h-16 bg-[#00e87a] text-[#003919] font-semibold rounded-xl hover:opacity-90 transition-all active:scale-95 flex flex-col items-center justify-center shadow-lg no-underline">
            <span class="text-lg leading-none pt-1">Claim My $20 - Start Now for Free</span>
          </a>
        </div>

        <div class="w-full h-[1px] bg-[#1f2820] my-10"></div>

        <section class="w-full mb-0">
          <div class="mb-7 rounded-[18px] border border-[#7a4b12] bg-[#111614] px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
            <div class="flex items-center justify-between gap-3 mb-3">
              <span class="text-[10px] font-black text-[#f5a623] tracking-[0.22em] uppercase">IMPORTANT TIP</span>
              <div class="inline-flex items-center gap-2 rounded-full border border-[#8c5615] bg-[#34200a] px-2.5 py-1">
                <span class="material-symbols-outlined text-[#f5a623] text-[13px]" style="font-variation-settings: 'FILL' 1;">schedule</span>
                <span class="text-[10px] font-bold tracking-[0.16em] text-[#f5a623] uppercase">EST. 5-10 MIN</span>
              </div>
            </div>
            <p class="text-white font-semibold text-[1.18rem] leading-[1.35] max-w-[290px]">
              Follow These Steps To Cash Out Your Welcome Bonus
            </p>
            <div class="w-full h-px bg-[#3a2b1a] my-5"></div>
            <div class="space-y-6">
              <div class="flex gap-3">
                <span class="flex-shrink-0 text-[#f5a623] font-black text-[15px] leading-none mt-1">1.</span>
                <div>
                  <h3 class="font-body text-white font-bold text-base mb-1">Create your account</h3>
                  <p class="text-[#7a9080] text-sm font-medium">Using either buttons on this page</p>
                </div>
              </div>

              <div class="flex gap-3">
                <span class="flex-shrink-0 text-[#f5a623] font-black text-[15px] leading-none mt-1">2.</span>
                <div>
                  <h3 class="font-body text-white font-bold text-base mb-1">Complete 2 quick starter offers</h3>
                  <p class="text-[#7a9080] text-sm font-medium">Takes under 5 minutes — unlocks full access</p>
                </div>
              </div>

              <div class="flex gap-3">
                <span class="flex-shrink-0 text-[#f5a623] font-black text-[15px] leading-none mt-1">3.</span>
                <div>
                  <h3 class="font-body text-white font-bold text-base mb-1">Cash out instantly</h3>
                  <p class="text-[#7a9080] text-sm font-medium">PayPal · CashApp · Venmo · Crypto</p>
                </div>
              </div>

              <div class="flex gap-3">
                <span class="flex-shrink-0 text-[#f5a623] font-black text-[15px] leading-none mt-1">4.</span>
                <div>
                  <div class="flex items-center gap-2 mb-1">
                    <h3 class="font-body text-white font-bold text-base">Don't stop there</h3>
                    <span class="inline-flex items-center rounded-full border border-[#8c5615] bg-[#34200a] px-2 py-0.5 text-[9px] font-bold tracking-[0.14em] text-[#f5a623] uppercase">OPTIONAL</span>
                  </div>
                  <p class="text-[#7a9080] text-sm font-medium">Keep making more by doing more offers</p>
                </div>
              </div>
            </div>
            <div class="mt-8 -mx-1">
              <a data-amber-glow href="#" class="w-full h-14 bg-[#f5a623] text-[#3d2300] font-semibold rounded-xl hover:opacity-90 transition-all active:scale-95 flex items-center justify-center shadow-lg no-underline">
                <span class="text-lg leading-none pt-1">Claim My Bonus Now</span>
              </a>
            </div>
          </div>
        </section>

        <div class="mt-auto w-full pt-[40px]">
          <div data-live-earners class="-mx-6 bg-[#111614] border-t border-white/5 px-6 py-3.5 flex items-center justify-center gap-2.5">
            <span data-live-dot class="w-3 h-3 rounded-full bg-[#00e87a] shadow-[0_0_0_4px_rgba(0,232,122,0.08),0_0_10px_rgba(0,232,122,0.3)] animate-pulse"></span>
            <span data-live-icon class="material-symbols-outlined text-[#8a958b] text-[18px]">group</span>
            <p class="text-[#8a958b] text-[13px] leading-none">
              Trusted by <span data-live-count class="text-[#00e87a] font-black">500,593</span> earners worldwide
            </p>
          </div>
        </div>
      </main>
    </div>
  `,
};
