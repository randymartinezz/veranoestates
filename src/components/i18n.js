/* =====================================================
   VERANO ESTATES® — INTERNATIONALISATION
   =====================================================
   Usage:
     VE_I18N.apply('en' | 'es')   — apply language to DOM
     VE_I18N.get()                 — current language
     localStorage key: 've_lang'
   ===================================================== */

window.VE_I18N = (() => {

  /* ── TRANSLATIONS ───────────────────────────────── */
  const T = {

    en: {
      /* Nav */
      nav_tagline:    'We curate what actually makes sense.',
      nav_properties: 'Properties',
      nav_contact:    'Contact',

      /* Hero */
      hero_eyebrow:   'Punta Cana\u00a0·\u00a0Dominican Republic',
      hero_headline:  'We Don\u2019t List<br><em>Properties.</em><br>We Close Them.',
      hero_sub:       'Premium real estate\u00a0·\u00a0Absolute discretion\u00a0·\u00a0Results.',
      hero_cta:       'START YOUR PROCESS',
      hero_scroll:    'Scroll',

      /* Selection form */
      sf_intro_q:   'Let\u2019s find your<br><em>ideal property.</em>',
      sf_intro_sub: 'We\u2019ll ask a few questions to understand your goals and connect you with the right opportunities.',
      sf_begin:     'Begin',
      sf_q1:        'What\u2019s your full name?',
      sf_q2:        'What\u2019s your email?',
      sf_q3:        'Your WhatsApp number?',
      sf_q4:        'What are you looking for?',
      sf_q5:        'What\u2019s your budget?',
      sf_q6:        'When are you planning to move forward?',
      sf_q8:        'We will contact you via WhatsApp to continue the process.',
      sf_consent_sub: 'Do you agree?',
      sf_consent_yes: 'YES, I AGREE',
      sf_q9:        'Schedule a call with our team.',
      sf_sched_hint:'Pick a day and time that works for you. You can also skip this and we\u2019ll reach out directly.',
      sf_continue:    'Continue',
      sf_accept:      'Accept',
      sf_hint_choice: 'Select the option that best fits',
      sf_living:    'Living',
      sf_invest:    'Investment',
      sf_both:      'Both',
      sf_asap:      'As soon as possible',
      sf_3m:        'Within 3 months',
      sf_6m:        'Within 6 months',
      sf_explore:   'Just exploring',
      sf_thanks:    'We\u2019ll be in touch.',
      sf_thanks_sub:'Thank you for sharing your goals with us. A member of our team will reach out shortly.',
      sf_close_btn: 'Close',

      /* Problem */
      problem_label: '03\u00a0\u2014 The Problem',
      problem_h2:    'Why most properties<br>don\u2019t sell.',
      p1_title: 'Wrong positioning',
      p1_body:  'Listed at the wrong price point, with generic photography and no defined buyer profile.',
      p2_title: 'No qualified audience',
      p2_body:  'Exposed to everyone \u2014 which means exposed to no one. High-net-worth buyers don\u2019t browse portals.',
      p3_title: 'Passive agents',
      p3_body:  'Most agents list and wait. There is no active outreach, no pipeline, no strategy.',
      p4_title: 'No urgency created',
      p4_body:  'Buyers need a reason to act now. Without it, interest stalls, deals die, and time is lost.',

      /* Solution */
      solution_label: '04\u00a0\u2014 The Solution',
      solution_h2:    'The Verano System.',
      solution_intro: 'A curated process designed to position, attract, and close.',
      s1_label: 'Positioning',
      s1_body:  'We define the unique value of each property and craft a narrative that speaks to the right buyer \u2014 not every buyer.',
      s2_label: 'Qualified Reach',
      s2_body:  'Our private network connects directly to high-net-worth individuals, investors, and qualified buyers across the Caribbean and globally.',
      s3_label: 'Active Sales',
      s3_body:  'Every property receives a dedicated outreach strategy, structured follow-up, and a clear sales timeline with milestones.',
      s4_label: 'Close',
      s4_body:  'From negotiation to final signature \u2014 we manage the entire process with precision, discretion, and speed.',

      /* Properties */
      properties_label: '05\u00a0\u2014 Properties',
      properties_h2:    'Curated inventory.<br>Selected to perform.',
      properties_note:  'Every property in our portfolio is actively managed and strategically positioned.',
      inquire:          'Inquire <span>\u2192</span>',

      /* CTA / Contact */
      cta_label: '04\u00a0\u2014 Contact',
      cta_h2:    'Ready to move?',
      cta_sub:   'Whether you\u2019re buying, selling, or investing \u2014 let\u2019s have a real conversation.',
      cta_wa:    'WhatsApp',

      /* Hero form */
      hform_title:    'Tell us what you\'re looking for.',
      hform_budget:   'Budget',
      hform_looking:  'What are you looking for?',
      hform_timeline: 'Timeline',

      /* Form */
      form_name:           'Full Name',
      form_email:          'Email',
      form_phone:          'WhatsApp / Phone',
      form_interest:       'I\u2019m interested in',
      form_select_default: 'Select one',
      form_opt_buy:        'Buying a property',
      form_opt_sell:       'Selling a property',
      form_opt_invest:     'Investing',
      form_opt_other:      'Other',
      form_message:        'Message',
      form_submit:         'Send Message',

      /* Floating WA */
      wa_text: 'Any questions? Chat with us.',

      /* Footer */
      footer_legal: 'All content is presented by VERANO ESTATES<sup>\u00ae</sup> for informational and promotional purposes only. Ownership of third-party materials remains with their respective owners. Any unauthorized use, reproduction, or distribution is strictly prohibited. VERANO ESTATES<sup>\u00ae</sup> &copy; 2026. All rights reserved.',
    },

    es: {
      /* Nav */
      nav_tagline:    'Curamos lo que realmente tiene sentido.',
      nav_properties: 'Propiedades',
      nav_contact:    'Contacto',

      /* Hero */
      hero_eyebrow:  'Punta Cana\u00a0·\u00a0Rep\u00fablica Dominicana',
      hero_headline: 'No Listamos<br><em>Propiedades.</em><br>Las Cerramos.',
      hero_sub:      'Bienes ra\u00edces premium\u00a0·\u00a0Discreción absoluta\u00a0·\u00a0Resultados.',
      hero_cta:      'INICIAR PROCESO',
      hero_scroll:   'Bajar',

      /* Selection form */
      sf_intro_q:   'Encontremos tu<br><em>propiedad ideal.</em>',
      sf_intro_sub: 'Te haremos unas preguntas para entender tus objetivos y conectarte con las oportunidades correctas.',
      sf_begin:     'Comenzar',
      sf_q1:        '\u00bfC\u00f3mo te llamas?',
      sf_q2:        '\u00bfCu\u00e1l es tu email?',
      sf_q3:        '\u00bfTu n\u00famero de WhatsApp?',
      sf_q4:        '\u00bfQu\u00e9 est\u00e1s buscando?',
      sf_q5:        '\u00bfCu\u00e1l es tu presupuesto?',
      sf_q6:        '\u00bfCu\u00e1ndo planeas tomar una decisi\u00f3n?',
      sf_q8:        'Te contactaremos por WhatsApp para continuar el proceso.',
      sf_consent_sub: '\u00bfEst\u00e1s de acuerdo?',
      sf_consent_yes: 'S\u00cd, ACEPTO',
      sf_q9:        'Agenda una llamada con nuestro equipo.',
      sf_sched_hint:'Elige el d\u00eda y horario que mejor te convenga. Tambi\u00e9n puedes omitir este paso y te contactaremos directamente.',
      sf_continue:    'Continuar',
      sf_accept:      'Aceptar',
      sf_hint_choice: 'Selecciona la opci\u00f3n que mejor encaje',
      sf_living:    'Vivienda',
      sf_invest:    'Inversi\u00f3n',
      sf_both:      'Ambos',
      sf_asap:      'Lo antes posible',
      sf_3m:        'En 3 meses',
      sf_6m:        'En 6 meses',
      sf_explore:   'Solo explorando',
      sf_thanks:    'Nos pondremos en contacto.',
      sf_thanks_sub:'Gracias por compartir tus objetivos. Un miembro de nuestro equipo se comunicar\u00e1 contigo pronto.',
      sf_close_btn: 'Cerrar',

      /* Problem */
      problem_label: '03\u00a0\u2014 El Problema',
      problem_h2:    'Por qu\u00e9 la mayor\u00eda de<br>propiedades no se venden.',
      p1_title: 'Posicionamiento incorrecto',
      p1_body:  'Listadas al precio equivocado, con fotograf\u00eda gen\u00e9rica y sin un perfil de comprador definido.',
      p2_title: 'Sin audiencia calificada',
      p2_body:  'Expuestas a todos, lo que equivale a no estar expuestas a nadie. Los compradores de alto patrimonio no navegan portales.',
      p3_title: 'Agentes pasivos',
      p3_body:  'La mayor\u00eda de los agentes lista y espera. No hay contacto activo, ni pipeline, ni estrategia.',
      p4_title: 'Sin urgencia generada',
      p4_body:  'Los compradores necesitan una raz\u00f3n para actuar ahora. Sin ella, el inter\u00e9s se detiene, los acuerdos mueren y el tiempo se pierde.',

      /* Solution */
      solution_label: '04\u00a0\u2014 La Soluci\u00f3n',
      solution_h2:    'El Sistema Verano.',
      solution_intro: 'Un proceso curado dise\u00f1ado para posicionar, atraer y cerrar.',
      s1_label: 'Posicionamiento',
      s1_body:  'Definimos el valor \u00fanico de cada propiedad y construimos una narrativa que habla al comprador correcto, no a cualquier comprador.',
      s2_label: 'Alcance Calificado',
      s2_body:  'Nuestra red privada conecta directamente con individuos de alto patrimonio, inversores y compradores calificados en el Caribe y a nivel global.',
      s3_label: 'Ventas Activas',
      s3_body:  'Cada propiedad recibe una estrategia de contacto dedicada, seguimiento estructurado y un cronograma de ventas claro con hitos definidos.',
      s4_label: 'Cierre',
      s4_body:  'Desde la negociaci\u00f3n hasta la firma final, gestionamos todo el proceso con precisi\u00f3n, discreci\u00f3n y velocidad.',

      /* Properties */
      properties_label: '05\u00a0\u2014 Propiedades',
      properties_h2:    'Inventario curado.<br>Seleccionado para rendir.',
      properties_note:  'Cada propiedad en nuestro portafolio es gestionada activamente y posicionada estrat\u00e9gicamente.',
      inquire:          'Consultar <span>\u2192</span>',

      /* CTA / Contact */
      cta_label: '04\u00a0\u2014 Contacto',
      cta_h2:    '\u00bfListo para actuar?',
      cta_sub:   'Ya sea comprando, vendiendo o invirtiendo \u2014 tengamos una conversaci\u00f3n real.',
      cta_wa:    'WhatsApp',

      /* Hero form */
      hform_title:    'Cuéntanos qué buscas.',
      hform_budget:   'Presupuesto',
      hform_looking:  '¿Qué estás buscando?',
      hform_timeline: 'Plazo',

      /* Form */
      form_name:           'Nombre Completo',
      form_email:          'Email',
      form_phone:          'WhatsApp / Tel\u00e9fono',
      form_interest:       'Me interesa',
      form_select_default: 'Seleccionar',
      form_opt_buy:        'Comprar una propiedad',
      form_opt_sell:       'Vender una propiedad',
      form_opt_invest:     'Invertir',
      form_opt_other:      'Otro',
      form_message:        'Mensaje',
      form_submit:         'Enviar Mensaje',

      /* Floating WA */
      wa_text: '\u00bfPreguntas? Chatea con nosotros.',

      /* Footer */
      footer_legal: 'Todo el contenido es presentado por VERANO ESTATES<sup>\u00ae</sup> con fines informativos y promocionales \u00fanicamente. La propiedad de los materiales de terceros pertenece a sus respectivos due\u00f1os. Cualquier uso, reproducci\u00f3n o distribuci\u00f3n no autorizada est\u00e1 estrictamente prohibida. VERANO ESTATES<sup>\u00ae</sup> &copy; 2026. Todos los derechos reservados.',
    },
  };

  /* ── APPLY ──────────────────────────────────────── */
  function apply(lang) {
    const l = T[lang] ? lang : 'en';
    const t = T[l];

    document.documentElement.lang = l;
    document.documentElement.setAttribute('data-lang', l);

    /* text nodes */
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key] !== undefined) el.textContent = t[key];
    });

    /* html nodes (contain <br>, <em>, <sup>, etc.) */
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      if (t[key] !== undefined) el.innerHTML = t[key];
    });
  }

  function get() {
    return document.documentElement.getAttribute('data-lang') || 'en';
  }

  return { apply, get, T };

})();
