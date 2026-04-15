/* =====================================================
   VERANO ESTATES® — WEB COMPONENTS
   =====================================================

   Components defined here:

   1. <verano-logo>
      Attributes: size="nav|hero|entry|footer|default"
                  variant="on-dark|on-light"

   2. <verano-entry>
      No attributes. Full-screen language selection overlay.
      Shows ENGLISH / ESPAÑOL buttons.
      Stores choice to localStorage ('ve_lang').
      Skips itself on return visits (language already set).

   Load order matters — VeranoLogo must be defined
   before VeranoEntry (it renders logos internally).
   i18n.js must be loaded before this file.
   ===================================================== */


/* ─────────────────────────────────────────────────────
   <verano-logo>
   ───────────────────────────────────────────────────── */
class VeranoLogo extends HTMLElement {
  static get observedAttributes() {
    return ['size', 'variant'];
  }

  connectedCallback() {
    this._render();
  }

  attributeChangedCallback() {
    if (this._img) this._applyClasses();
  }

  _render() {
    const size     = this.getAttribute('size') || 'default';
    const img      = document.createElement('img');
    img.src        = size === 'nav'
                       ? 'public/assets/logos/verano-navbar-logo.png'
                       : 'public/assets/logos/verano-estates-logo.png';
    img.alt        = 'Verano Estates';
    img.draggable  = false;

    this._img = img;
    this._applyClasses();
    this.appendChild(img);
  }

  _applyClasses() {
    const size    = this.getAttribute('size')    || 'default';
    const variant = this.getAttribute('variant') || 'on-dark';

    this._img.className = [
      'verano-logo',
      `verano-logo--${size}`,
      `verano-logo--${variant}`,
    ].join(' ');
  }
}

customElements.define('verano-logo', VeranoLogo);


/* ─────────────────────────────────────────────────────
   <verano-entry>
   ─────────────────────────────────────────────────────
   Full-screen entry overlay. Appears on page load,
   fades out when user clicks ENTER.

   Locks body scroll while visible.
   Removes itself from DOM after exit transition.
   ───────────────────────────────────────────────────── */
class VeranoEntry extends HTMLElement {
  connectedCallback() {
    this._render();
    this._lockScroll();
    this._bindEvents();
  }

  _render() {
    this.innerHTML = `
      <video class="entry__video" autoplay muted loop playsinline poster="public/assets/images/hero/hero-main.png">
        <source src="public/assets/video/hero.mov" type="video/mp4">
      </video>
      <div class="entry__vignette"></div>
      <div class="entry__content">
        <verano-logo size="entry" variant="on-dark"></verano-logo>
        <p class="entry__tagline">Built on Sales. Proven in the Caribbean.</p>
        <span class="entry__divider" aria-hidden="true"></span>
        <div class="entry__langs">
          <button class="entry__lang-btn" type="button" data-lang="en">English</button>
          <button class="entry__lang-btn" type="button" data-lang="es">Español</button>
        </div>
      </div>
    `;
  }

  _lockScroll() {
    document.body.classList.add('no-scroll');
  }

  _unlockScroll() {
    document.body.classList.remove('no-scroll');
  }

  _bindEvents() {
    this.querySelectorAll('.entry__lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        if (window.VE_I18N) window.VE_I18N.apply(lang);
        this._transition();
      });
    });

    // Keyboard: Enter / Escape defaults to English
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === 'Escape') {
        if (window.VE_I18N) window.VE_I18N.apply('en');
        this._transition();
      }
    }, { once: true });
  }

  _transition() {
    // Build brand overlay
    const overlay = document.createElement('div');
    overlay.className = 'entry__transition';
    overlay.innerHTML = `
      <img class="entry__transition-logo"
           src="public/assets/logos/verano-estates-logo-1.png"
           alt="" aria-hidden="true">
    `;
    document.body.appendChild(overlay);

    // After isotipo animation completes fully, fade overlay out and reveal page
    setTimeout(() => {
      overlay.classList.add('entry__transition--out');
      this._exit();                          // fade out entry screen simultaneously
      overlay.addEventListener('transitionend', () => overlay.remove(), { once: true });
    }, 1050);
  }

  _exit() {
    this.classList.add('entry--exiting');
    this._unlockScroll();
    this.addEventListener('transitionend', () => {
      this.remove();
    }, { once: true });
  }
}

customElements.define('verano-entry', VeranoEntry);
