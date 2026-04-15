/* =====================================================
   VERANO ESTATES® — INTERACTIONS
   ===================================================== */

(function () {
  'use strict';

  /* ─── NAV: fixed, no scroll behaviour ─── */
  const nav = document.getElementById('nav');   /* kept for smooth-scroll offset calc */

  /* ─── HERO: subtle parallax ─── */
  const heroBg = document.querySelector('.hero__bg');

  function handleParallax() {
    const scrolled = window.scrollY;
    const heroH = window.innerHeight;
    if (heroBg && scrolled < heroH) {
      heroBg.style.transform = `translateY(${scrolled * 0.18}px) scale(1.08)`;
    }
  }

  // Only run parallax on non-touch, sufficient-motion devices
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReduced) {
    window.addEventListener('scroll', handleParallax, { passive: true });
  } else {
    if (heroBg) heroBg.style.transform = 'scale(1.05)';
  }

  /* ─── SCROLL REVEAL ─── */
  const revealSelectors = [
    '.problem__item',
    '.solution__step',
    '.property__card',
    '.split',
    '.split__img',
    '.properties__header',
    '.why__header',
    '.why__block',
    '.cta__heading',
    '.cta__sub',
    '.cta__actions',
  ];

  const revealEls = document.querySelectorAll(revealSelectors.join(', '));

  revealEls.forEach((el, i) => {
    el.classList.add('reveal');
    // Stagger siblings within same parent
    const siblings = Array.from(el.parentNode.children).filter(
      (c) => c.classList.contains(el.classList[0])
    );
    const idx = siblings.indexOf(el);
    if (idx > 0 && idx <= 4) {
      el.classList.add(`reveal-delay-${idx}`);
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  revealEls.forEach((el) => observer.observe(el));


  /* ─── CURATED SLIDER ─── */
  (function () {
    const slider  = document.querySelector('.curated__slider');
    if (!slider) return;

    const track   = slider.querySelector('.curated__track');
    const dots    = slider.querySelectorAll('.curated__dot');
    const total   = dots.length;
    let   current = 0;
    let   startX  = 0;
    let   isDrag  = false;

    function goTo(idx) {
      current = (idx + total) % total;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('is-active', i === current));
    }

    // Dot clicks
    dots.forEach((dot) => {
      dot.addEventListener('click', () => goTo(Number(dot.dataset.index)));
    });

    // Touch / swipe support
    slider.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDrag = true;
    }, { passive: true });

    slider.addEventListener('touchend', (e) => {
      if (!isDrag) return;
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
      isDrag = false;
    }, { passive: true });

    // Auto-advance every 5s
    let timer = setInterval(() => goTo(current + 1), 5000);
    slider.addEventListener('mouseenter', () => clearInterval(timer));
    slider.addEventListener('mouseleave', () => {
      timer = setInterval(() => goTo(current + 1), 5000);
    });
  })();

  /* ─── SMOOTH ANCHOR SCROLL (offset for fixed nav) ─── */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navH = nav.offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ─── SELECTION OVERLAY + MULTI-STEP FORM ─── */
  (function () {
    const overlay   = document.getElementById('selOverlay');
    const selForm   = document.getElementById('selForm');
    const isoEl     = overlay ? overlay.querySelector('.sel-overlay__iso') : null;
    const closeBtn  = document.getElementById('selClose');
    const backBtn   = document.getElementById('selBack');
    const actionBtn = document.getElementById('selAction');
    const progress  = document.getElementById('selProgress');
    const ctaBtn    = document.querySelector('.hero__cta-btn');

    if (!overlay || !selForm || !ctaBtn) return;

    const TOTAL        = 9;    // steps 1–9; step 10 is confirmation
    const CHOICE_STEPS = [5, 6, 7];   // looking-for, budget, timeline
    const CONSENT_STEP = 8;
    let   current      = 1;
    let   formData     = {};

    /* Helper — pull translation string from VE_I18N */
    function t(key) {
      const lang = window.VE_I18N ? window.VE_I18N.get() : 'en';
      return (window.VE_I18N && window.VE_I18N.T[lang][key]) || key;
    }

    /* Update progress bar + back button + action button label */
    function updateNav() {
      const done = current > TOTAL;
      // Intro (step 1) shows 0%; scheduling (step 9) shows ~89%; done = 100%
      progress.style.width = done ? '100%' : `${((current - 1) / TOTAL) * 100}%`;
      backBtn.hidden        = current <= 1 || done;

      if (done) {
        actionBtn.textContent = t('sf_close_btn');
      } else if (current === 1) {
        actionBtn.textContent = t('sf_begin');
      } else if (current === CONSENT_STEP) {
        actionBtn.textContent = t('sf_consent_yes');
      } else if (CHOICE_STEPS.includes(current)) {
        actionBtn.textContent = t('sf_accept');
      } else {
        actionBtn.textContent = t('sf_continue');
      }
    }

    /* Transition between steps — exit current, enter n */
    function goToStep(n) {
      const active = selForm.querySelector('.sel-form__step.is-active');
      const delay  = active ? 300 : 0;

      if (active) {
        active.classList.add('is-exiting');
        active.classList.remove('is-active');
        setTimeout(() => active.classList.remove('is-exiting'), 300);
      }

      setTimeout(() => {
        current = n;
        const next = selForm.querySelector(`[data-step="${n}"]`);
        if (next) {
          next.classList.add('is-active');
          const inp = next.querySelector('.sel-form__input');
          if (inp) setTimeout(() => inp.focus(), 60);
        }
        updateNav();
      }, delay);
    }

    /* Validate + collect text-input steps, then advance.
       For choice steps: advance only if a value has been selected. */
    function advance() {
      const active = selForm.querySelector('.sel-form__step.is-active');
      if (!active) return;

      // Thank-you step — action button closes
      if (current > TOTAL) { closeSelForm(); return; }

      const inp    = active.querySelector('.sel-form__input');
      const hidden = active.querySelector('input[type="hidden"]');

      if (inp) {
        // Text input step
        if (!inp.value.trim()) {
          inp.classList.add('is-error');
          setTimeout(() => inp.classList.remove('is-error'), 700);
          return;
        }
        formData[inp.name] = inp.value.trim();
      } else if (hidden && !hidden.value) {
        // Choice step — nothing selected yet, shake the options
        const opts = active.querySelector('.sel-form__opts');
        if (opts) {
          opts.style.animation = 'none';
          void opts.offsetWidth;
          opts.style.animation = 'selShake 0.38s ease';
          setTimeout(() => { opts.style.animation = ''; }, 400);
        }
        return;
      }

      goToStep(current < TOTAL ? current + 1 : TOTAL + 1);
    }

    /* Show overlay → animate isotipo → reveal form */
    function openOverlay() {
      if (isoEl) {
        isoEl.style.animation = 'none';
        void isoEl.offsetWidth;
        isoEl.style.animation = '';
      }

      overlay.setAttribute('aria-hidden', 'false');
      overlay.classList.add('is-active');
      document.body.style.overflow = 'hidden';

      // At 900ms: start overlay exit + reveal form underneath
      setTimeout(() => {
        overlay.classList.add('is-exiting');

        // Reset form state
        selForm.querySelectorAll('.sel-form__step').forEach(s => s.classList.remove('is-active', 'is-exiting'));
        selForm.querySelectorAll('.sel-form__opt').forEach(o => o.classList.remove('is-selected'));
        selForm.querySelectorAll('.sel-form__input').forEach(i => { i.value = ''; });
        selForm.querySelectorAll('input[type="hidden"]').forEach(i => { i.value = ''; });
        current  = 1;
        formData = {};

        selForm.setAttribute('aria-hidden', 'false');
        selForm.classList.add('is-active');
        goToStep(1);
      }, 900);

      // Remove overlay after exit transition completes
      setTimeout(() => {
        overlay.classList.remove('is-active', 'is-exiting');
        overlay.setAttribute('aria-hidden', 'true');
      }, 1240);
    }

    /* Close and reset the form */
    function closeSelForm() {
      selForm.classList.remove('is-active');
      selForm.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      setTimeout(() => {
        selForm.querySelectorAll('.sel-form__step').forEach(s => s.classList.remove('is-active', 'is-exiting'));
        selForm.querySelectorAll('.sel-form__opt').forEach(o => o.classList.remove('is-selected'));
        selForm.querySelectorAll('.sel-form__input').forEach(i => { i.value = ''; });
        selForm.querySelectorAll('input[type="hidden"]').forEach(i => { i.value = ''; });
        current  = 1;
        formData = {};
      }, 400);
    }

    /* ── Event listeners ── */

    ctaBtn.addEventListener('click', openOverlay);
    closeBtn.addEventListener('click', closeSelForm);
    backBtn.addEventListener('click', () => { if (current > 1) goToStep(current - 1); });
    actionBtn.addEventListener('click', advance);

    // Option tiles — select + auto-advance after brief pause
    selForm.querySelectorAll('.sel-form__opt').forEach(btn => {
      btn.addEventListener('click', () => {
        const step   = btn.closest('.sel-form__step');
        const hidden = step.querySelector('input[type="hidden"]');
        if (hidden) {
          hidden.value          = btn.dataset.value;
          formData[hidden.name] = btn.dataset.value;
        }
        step.querySelectorAll('.sel-form__opt').forEach(b => b.classList.remove('is-selected'));
        btn.classList.add('is-selected');
        setTimeout(() => goToStep(current < TOTAL ? current + 1 : TOTAL + 1), 340);
      });
    });

    // Keyboard: Enter triggers action, Escape closes
    selForm.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        actionBtn.click();
        return;
      }
      // Letter shortcuts A–D for choice steps
      if (CHOICE_STEPS.includes(current)) {
        const keyMap = { a: 0, b: 1, c: 2, d: 3, A: 0, B: 1, C: 2, D: 3 };
        const idx = keyMap[e.key];
        if (idx !== undefined) {
          const active = selForm.querySelector('.sel-form__step.is-active');
          if (active) {
            const opts = active.querySelectorAll('.sel-form__opt');
            if (opts[idx]) opts[idx].click();
          }
        }
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && selForm.classList.contains('is-active')) closeSelForm();
    });

    // Calendly booking confirmation — auto-advance to confirmation screen
    window.addEventListener('message', (e) => {
      if (e.data && e.data.event === 'calendly.event_scheduled' && current === 9) {
        setTimeout(() => goToStep(TOTAL + 1), 600);
      }
    });

  })();

})();
