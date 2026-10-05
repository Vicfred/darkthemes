(() => {
  if (location.pathname === '/problemset' ||
      location.pathname === '/problemset/' ||
      location.pathname.startsWith('/problemsets/acmsguru')) {
    document.documentElement.classList.add('cf-molokai-problemset');
    const markBody = () => document.body?.classList.add('cf-molokai-problemset');
    markBody();
    if (!document.body) {
      document.addEventListener('DOMContentLoaded', markBody, { once: true });
    }
  }

  const colours = {
    bg: '#1b1d1e',
    surface: '#20211d',
    raised: '#272822',
    hover: '#30312b',
    border: '#3e3d32',
    fg: '#e8e8e3',
    strong: '#f8f8f2',
    muted: '#a6a69c',
    pink: '#f92672',
    cyan: '#66d9ef'
  };

  const set = (element, property, value) => {
    element.style.setProperty(property, value, 'important');
  };

  const paintControl = (element) => {
    set(element, 'background', colours.raised);
    set(element, 'background-color', colours.raised);
    set(element, 'background-image', 'none');
    set(element, 'color', colours.fg);
    set(element, 'border-color', colours.border);
    set(element, 'box-shadow', 'none');
    set(element, 'color-scheme', 'dark');
  };

  const paintContestFilterBox = () => {
    const candidates = [...document.querySelectorAll('.roundbox, aside, form, div')]
      .filter((element) => {
        const text = element.innerText || '';
        return text.includes('Past contests filter') &&
          text.includes('Contest type:') &&
          text.length < 1500;
      })
      .sort((a, b) => a.getBoundingClientRect().width * a.getBoundingClientRect().height -
        b.getBoundingClientRect().width * b.getBoundingClientRect().height);

    const box = candidates[0];
    if (!box) {
      return;
    }

    for (const control of box.querySelectorAll('select, button, input:not([type="checkbox"]), [role="combobox"]')) {
      paintControl(control);
    }

    /*
     * Codeforces occasionally wraps the real control in generated spans/divs.
     * Paint the small wrapper too, rather than playing selector whack-a-mole
     * with whichever widget library happens to be in fashion this decade.
     */
    for (const element of box.querySelectorAll('div, span, a')) {
      const text = (element.textContent || '').trim();
      const rect = element.getBoundingClientRect();
      if ((text === 'Any' || text === 'Select') && rect.width > 80 && rect.height < 50) {
        paintControl(element);
        if (element.parentElement && element.parentElement !== box) {
          paintControl(element.parentElement);
        }
      }
    }
  };

  const isContestTypeMenu = (element) => {
    const text = (element.innerText || '').replace(/\s+/g, ' ');
    if (text.length > 1000) {
      return false;
    }

    const markers = ['Div. 1', 'Div. 2', 'Div. 3'];
    const hasDivisions = markers.every((marker) => text.includes(marker));
    const hasExtraType = text.includes('Educational') ||
      text.includes('CodeTON') ||
      text.includes('Global') ||
      text.includes('Kotlin');

    return hasDivisions && hasExtraType;
  };

  const paintContestTypeMenu = () => {
    const candidates = [...document.querySelectorAll('div, ul, fieldset')]
      .filter(isContestTypeMenu)
      .filter((element) => {
        const rect = element.getBoundingClientRect();
        return rect.width > 120 && rect.width < 500 && rect.height > 80;
      })
      .sort((a, b) => {
        const ar = a.getBoundingClientRect();
        const br = b.getBoundingClientRect();
        return ar.width * ar.height - br.width * br.height;
      });

    const menu = candidates[0];
    if (!menu) {
      return;
    }

    set(menu, 'background', colours.surface);
    set(menu, 'background-color', colours.surface);
    set(menu, 'color', colours.fg);
    set(menu, 'border-color', colours.border);
    set(menu, 'color-scheme', 'dark');

    for (const element of menu.querySelectorAll('*')) {
      const tag = element.tagName;

      if (tag === 'INPUT' && element.type === 'checkbox') {
        set(element, 'accent-color', colours.pink);
        set(element, 'color-scheme', 'dark');
        continue;
      }

      if (tag === 'IMG' || tag === 'SVG' || tag === 'PATH') {
        continue;
      }

      const computed = getComputedStyle(element);
      const background = computed.backgroundColor;

      /* Replace the pale widget surfaces, but leave transparent structure alone. */
      if (background === 'rgb(255, 255, 255)' ||
          background === 'rgb(250, 250, 250)' ||
          background === 'rgb(248, 248, 248)' ||
          background === 'rgb(245, 245, 245)') {
        set(element, 'background', colours.surface);
        set(element, 'background-color', colours.surface);
        set(element, 'background-image', 'none');
      }

      if (tag === 'LI' || tag === 'LABEL') {
        set(element, 'background', colours.surface);
        set(element, 'background-color', colours.surface);
        set(element, 'background-image', 'none');
        set(element, 'color', colours.fg);
        set(element, 'border-color', colours.border);
      }
    }
  };



  const paintMathJax = () => {
    const mathNodes = document.querySelectorAll(
      'mjx-container, ' +
      '.MathJax, ' +
      '.MathJax_Display, ' +
      '.MathJax_SVG, ' +
      '.MathJax_SVG_Display, ' +
      '.MathJax_CHTML, ' +
      '.MathJax_CHTML_Display'
    );

    for (const math of mathNodes) {
      set(math, 'color', colours.fg);

      for (const element of math.querySelectorAll('*')) {
        set(element, 'color', colours.fg);
      }

      for (const glyph of math.querySelectorAll('svg path, svg use')) {
        set(glyph, 'fill', colours.fg);
      }

      for (const stroke of math.querySelectorAll('svg [stroke]:not([stroke="none"])')) {
        set(stroke, 'stroke', colours.fg);
      }
    }
  };

  const paintRatedUsers = () => {
    const ratingColours = [
      ['user-black', '#b8b8b2'],
      ['user-gray', '#b8b8b2'],
      ['user-green', '#a6e22e'],
      ['user-cyan', '#66d9ef'],
      ['user-blue', '#5f87ff'],
      ['user-violet', '#ae81ff'],
      ['user-orange', '#fd971f'],
      ['user-red', '#ff5f5f'],
      ['user-admin', '#ff5f5f'],
      ['user-legendary', '#ff5f5f']
    ];

    for (const user of document.querySelectorAll('a.rated-user')) {
      const match = ratingColours.find(([className]) => user.classList.contains(className));
      if (!match) {
        continue;
      }

      const [, colour] = match;
      set(user, 'color', colour);

      for (const child of user.querySelectorAll('*')) {
        set(child, 'color', colour);
      }
    }
  };



  const paintRegistrationNotice = () => {
    const candidates = [...document.querySelectorAll('div, section')]
      .filter((element) => {
        const text = (element.innerText || '').replace(/\s+/g, ' ').trim();
        return text.includes('You registered for the contest as:') &&
          text.includes('Unregister') &&
          text.length < 1200;
      })
      .sort((a, b) => {
        const ar = a.getBoundingClientRect();
        const br = b.getBoundingClientRect();
        return ar.width * ar.height - br.width * br.height;
      });

    const notice = candidates[0];
    if (!notice) {
      return;
    }

    notice.classList.add('cf-molokai-registration-notice');
    set(notice, 'background', colours.surface);
    set(notice, 'background-color', colours.surface);
    set(notice, 'background-image', 'none');
    set(notice, 'color', colours.fg);
    set(notice, 'border-color', colours.border);
    set(notice, 'box-shadow', 'none');

    for (const element of notice.querySelectorAll('*')) {
      const tag = element.tagName;
      if (tag === 'IMG' || tag === 'SVG' || tag === 'PATH') {
        continue;
      }

      const computed = getComputedStyle(element);
      const background = computed.backgroundColor;
      if (background === 'rgb(217, 237, 247)' ||
          background === 'rgb(223, 240, 216)' ||
          background === 'rgb(255, 255, 255)' ||
          background === 'rgb(245, 245, 245)') {
        set(element, 'background', 'transparent');
        set(element, 'background-color', 'transparent');
        set(element, 'background-image', 'none');
      }

      if (tag === 'BUTTON' ||
          (tag === 'INPUT' && ['button', 'submit'].includes(element.type))) {
        paintControl(element);
      }
    }
  };

  const markRecentActions = () => {
    /*
     * The home-page caption is rendered as "→ Recent actions". Older
     * versions of this theme looked for text starting with "Recent actions",
     * so the box was never marked and its title links kept the global cyan.
     * Anchor the detection on the caption itself instead of the whole box.
     */
    const captions = [...document.querySelectorAll(
      '.roundbox .caption, .roundbox .caption.titled, .caption, .caption.titled'
    )];

    for (const caption of captions) {
      const text = (caption.textContent || '')
        .replace(/\s+/g, ' ')
        .replace(/^→\s*/, '')
        .trim()
        .toLowerCase();

      if (text !== 'recent actions') {
        continue;
      }

      const box = caption.closest('.roundbox') || caption.parentElement;
      if (box) {
        box.classList.add('cf-molokai-recent-actions');
      }
    }

    /* Fallback for layouts where the caption has no useful class. */
    for (const box of document.querySelectorAll('.roundbox')) {
      const text = (box.innerText || '').replace(/\s+/g, ' ').trim();
      if (text.includes('Recent actions') && text.includes('→')) {
        box.classList.add('cf-molokai-recent-actions');
      }
    }
  };

  const paint = () => {
    paintContestFilterBox();
    paintContestTypeMenu();
    paintRatedUsers();
    paintMathJax();
    paintRegistrationNotice();
    markRecentActions();
  };

  let scheduled = false;
  const schedulePaint = () => {
    if (scheduled) {
      return;
    }

    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      paint();
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', paint, { once: true });
  } else {
    paint();
  }

  /* The menu is created/reparented when opened, so style it after mutations too. */
  const observer = new MutationObserver(schedulePaint);
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class', 'style']
  });


})();
