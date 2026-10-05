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

  const findContestHero = (heading) => {
    const namedHero = heading.closest(
      ".jumbotron, .contest-top, .contest-top-info, .contest-top-information, .contest-title, .contest-header, .hero, .hero-unit"
    );
    if (namedHero) {
      return namedHero;
    }

    let element = heading.parentElement;
    for (let depth = 0; element && element !== document.body && depth < 7; depth += 1) {
      const controls = [
        ...element.querySelectorAll("a, button, input[type='button'], input[type='submit']")
      ];
      if (controls.some(isContestHeroControl)) {
        return element;
      }
      element = element.parentElement;
    }

    return null;
  };

  const applyContestHero = () => {
    const headings = [...document.querySelectorAll("h1")];

    for (const heading of headings) {
      if (!/^AtCoder\b/i.test(heading.textContent.trim())) {
        continue;
      }

      const hero = findContestHero(heading);
      if (!hero) {
        continue;
      }

      hero.classList.add("ac-molokai-contest-hero");
      important(hero, "background", colours.surface);
      important(hero, "background-color", colours.surface);
      important(hero, "color", colours.foreground);
      important(hero, "border-color", colours.border);
      important(hero, "box-shadow", "none");

      important(heading, "color", colours.strong);
      important(heading, "text-shadow", "none");

      for (const control of hero.querySelectorAll("a, button, input[type='button'], input[type='submit']")) {
        if (!isContestHeroControl(control)) {
          continue;
        }
        important(control, "background", colours.raised);
        important(control, "background-color", colours.raised);
        important(control, "color", colours.foreground);
        important(control, "border", `1px solid ${colours.border}`);
        important(control, "border-radius", "3px");
        important(control, "box-shadow", "none");
      }
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
