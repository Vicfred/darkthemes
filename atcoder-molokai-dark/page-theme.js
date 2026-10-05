(() => {
  const colours = new Map([
    ["#000000", "#e8e8e3"],
    ["#000", "#e8e8e3"],
    ["black", "#e8e8e3"],
    ["#ffffff", "#272822"],
    ["#fff", "#272822"],
    ["white", "#272822"],

    // AtCoder rating colours -> vivid neon Molokai-flavoured equivalents.
    ["#808080", "#e8e8e3"],
    ["#804000", "#ff9f43"],
    ["#008000", "#a6ff4d"],
    ["#00c0c0", "#66f5ff"],
    ["#0000ff", "#7f8cff"],
    ["#c0c000", "#fff56b"],
    ["#ff8000", "#ff7300"],
    ["#ff0000", "#ff4f87"],

    // Older AtCoder graph palette still seen on some profile variants.
    ["#eeeeee", "#e8e8e3"],
    ["#8b4513", "#ff9f43"],
    ["#7aff7a", "#a6ff4d"],
    ["#7affff", "#66f5ff"],
    ["#7a7aff", "#7f8cff"],
    ["#ffff7a", "#fff56b"],
    ["#ffbc7a", "#ff7300"],
    ["#ff7a7a", "#ff4f87"]
  ]);

  const rgbToHex = value => {
    const match = value.match(
      /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(?:\s*,\s*[\d.]+)?\s*\)$/i
    );

    if (!match) {
      return null;
    }

    const components = match.slice(1, 4).map(component =>
      Number(component).toString(16).padStart(2, "0")
    );

    return `#${components.join("")}`;
  };

  const normalizeColour = value => {
    if (typeof value !== "string") {
      return value;
    }

    const normalized = value.trim().toLowerCase();
    const hex = rgbToHex(normalized);

    return colours.get(normalized) || (hex && colours.get(hex)) || value;
  };

  /*
   * Both the rating history and rating-distribution charts are canvases.
   * Their ids differ across graph modes, so treat every canvas on an AtCoder
   * user profile as a profile graph instead of hard-coding only ratingGraph.
   */
  const isProfileGraphCanvas = context =>
    context &&
    context.canvas instanceof HTMLCanvasElement &&
    /^\/users\/[^/]+/.test(location.pathname);

  const patchStyleProperty = property => {
    const descriptor = Object.getOwnPropertyDescriptor(
      CanvasRenderingContext2D.prototype,
      property
    );

    if (!descriptor || !descriptor.get || !descriptor.set || !descriptor.configurable) {
      return;
    }

    Object.defineProperty(CanvasRenderingContext2D.prototype, property, {
      configurable: true,
      enumerable: descriptor.enumerable,
      get: descriptor.get,
      set(value) {
        descriptor.set.call(
          this,
          isProfileGraphCanvas(this) ? normalizeColour(value) : value
        );
      }
    });
  };

  patchStyleProperty("fillStyle");
  patchStyleProperty("strokeStyle");
  patchStyleProperty("shadowColor");

  // Keep translucent rating bands and bars vivid on the dark page.
  const alphaDescriptor = Object.getOwnPropertyDescriptor(
    CanvasRenderingContext2D.prototype,
    "globalAlpha"
  );

  if (
    alphaDescriptor &&
    alphaDescriptor.get &&
    alphaDescriptor.set &&
    alphaDescriptor.configurable
  ) {
    Object.defineProperty(CanvasRenderingContext2D.prototype, "globalAlpha", {
      configurable: true,
      enumerable: alphaDescriptor.enumerable,
      get: alphaDescriptor.get,
      set(value) {
        let alpha = value;

        if (
          isProfileGraphCanvas(this) &&
          typeof value === "number" &&
          value < 0.8
        ) {
          alpha = Math.min(0.78, Math.max(value, value * 1.9));
        }

        alphaDescriptor.set.call(this, alpha);
      }
    });
  }

  /*
   * AtCoder adds a bright canvas shadow around the rating-history polyline.
   * It looks like a white glow on a dark theme, so disable canvas shadows on
   * profile graphs while leaving the rest of the site untouched.
   */
  for (const property of ["shadowBlur", "shadowOffsetX", "shadowOffsetY"]) {
    const descriptor = Object.getOwnPropertyDescriptor(
      CanvasRenderingContext2D.prototype,
      property
    );

    if (!descriptor || !descriptor.get || !descriptor.set || !descriptor.configurable) {
      continue;
    }

    Object.defineProperty(CanvasRenderingContext2D.prototype, property, {
      configurable: true,
      enumerable: descriptor.enumerable,
      get: descriptor.get,
      set(value) {
        descriptor.set.call(this, isProfileGraphCanvas(this) ? 0 : value);
      }
    });
  }
})();
