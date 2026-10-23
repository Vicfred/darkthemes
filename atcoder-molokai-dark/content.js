(() => {
  const colours = {
    background: "#1b1d1e",
    surface: "#20211d",
    raised: "#272822",
    border: "#3e3d32",
    foreground: "#e8e8e3",
    strong: "#f8f8f2"
  };

  const important = (element, property, value) => {
    element.style.setProperty(property, value, "important");
  };

  const applyPageBackground = () => {
    const elements = [
      document.documentElement,
      document.body,
      document.getElementById("main-div"),
      document.getElementById("main-container"),
      document.querySelector("footer"),
      document.querySelector(".footer")
    ];

    for (const element of elements) {
      if (!element) {
        continue;
      }

      important(element, "background", colours.background);
      important(element, "background-color", colours.background);
    }

    const main = document.getElementById("main-container");
    if (main) {
      important(main, "box-shadow", "none");
    }
  };

  const isContestHeroControl = (element) => {
    const text = `${element.textContent || ""} ${element.value || ""}`.trim();
    return /^(register|virtual\s+participation)$/i.test(text);
  };

  const findContestHeroFromControl = (control) => {
    const namedHero = control.closest(
      ".jumbotron, .contest-top, .contest-top-info, .contest-top-information, .contest-title, .contest-header, .hero, .hero-unit"
    );
    if (namedHero) {
      return namedHero;
    }

    /*
     * Sponsored contests do not necessarily begin their title with "AtCoder".
     * Walk upwards from the actual Register / Virtual Participation control
     * and take the nearest ancestor that also contains the contest <h1>.
     */
    let element = control.parentElement;
    for (let depth = 0; element && element !== document.body && depth < 8; depth += 1) {
      if (element.querySelector(":scope h1, h1")) {
        return element;
      }
      element = element.parentElement;
    }

    return null;
  };

  const applyContestHero = () => {
    const controls = [
      ...document.querySelectorAll("a, button, input[type='button'], input[type='submit']")
    ].filter(isContestHeroControl);

    for (const control of controls) {
      const hero = findContestHeroFromControl(control);
      if (!hero) {
        continue;
      }

      hero.classList.add("ac-molokai-contest-hero");
      important(hero, "background", colours.surface);
      important(hero, "background-color", colours.surface);
      important(hero, "background-image", "none");
      important(hero, "color", colours.foreground);
      important(hero, "border-color", colours.border);
      important(hero, "box-shadow", "none");

      const heading = hero.querySelector("h1");
      if (heading) {
        important(heading, "color", colours.strong);
        important(heading, "text-shadow", "none");
      }

      important(control, "background", colours.raised);
      important(control, "background-color", colours.raised);
      important(control, "background-image", "none");
      important(control, "color", colours.foreground);
      important(control, "border", `1px solid ${colours.border}`);
      important(control, "border-radius", "3px");
      important(control, "box-shadow", "none");
    }
  };

  const applyThemeFixes = () => {
    applyPageBackground();
    applyContestHero();
  };

  applyThemeFixes();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyThemeFixes, { once: true });
  }

  const observer = new MutationObserver(applyThemeFixes);
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
