const body = document.body;
const tabs = [...document.querySelectorAll(".switcher-tab")];
const prototypes = [...document.querySelectorAll(".prototype")];
const progress = document.querySelector(".scroll-progress");
const cursor = document.querySelector(".cursor-orb");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

function scrollToPageTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
}

scrollToPageTop();
requestAnimationFrame(scrollToPageTop);

window.addEventListener("pageshow", () => {
  scrollToPageTop();
  window.setTimeout(scrollToPageTop, 90);
});

window.addEventListener("load", () => {
  scrollToPageTop();
  window.setTimeout(scrollToPageTop, 160);
});

const roles = {
  adyen: {
    date: "August 2025 - December 2025",
    title: "Software Engineering Intern, Adyen",
    summary:
      "Engineered Java backend systems for real-time alternative payment processing across PayPal, Affirm, and CashApp, including asynchronous callbacks, multi-step redirects, and transactional consistency.",
    tags: ["Java", "PostgreSQL", "Docker", "RabbitMQ"],
  },
  deere: {
    date: "October 2023 - August 2025",
    title: "Software Engineering Intern, John Deere",
    summary:
      "Created REST APIs, Azure/KQL dashboards, SQL testing pipelines, and load tests for manufacturing tools, improving response time by 23% under peak traffic simulation.",
    tags: ["Java", "Spring Boot", "SQL", "RabbitMQ", "Redis", "Azure"],
  },
  asus: {
    date: "June 2023 - August 2023",
    title: "Software Engineering Intern, ASUS",
    summary:
      "Developed and deployed 10 GraphQL APIs using MongoDB, TypeScript, Node.js, and FeathersJS, with Jest unit tests and performance experiments using Azure and KQL.",
    tags: ["GraphQL", "MongoDB", "TypeScript", "Node.js", "Jest"],
  },
  cs124: {
    date: "January 2023 - January 2024",
    title: "Course Assistant, CS 124",
    summary:
      "Supported more than 50 students with Java labs, object-oriented design, Android Studio UI layout, and debugging.",
    tags: ["Java", "Android Studio", "Teaching", "Debugging"],
  },
};

function setPrototype(target) {
  tabs.forEach((tab) => {
    const isActive = tab.dataset.target === target;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  prototypes.forEach((prototype) => {
    const isActive = prototype.dataset.prototype === target;
    prototype.classList.toggle("is-active", isActive);
    prototype.setAttribute("aria-hidden", String(!isActive));
  });

  document.querySelectorAll(`#${target} .reveal`).forEach((element) => {
    element.classList.add("is-visible");
  });

  body.classList.remove("mode-command", "mode-kinetic", "mode-lanyard");
  body.classList.add(`mode-${target}`);
  if (target === "lanyard") {
    requestAnimationFrame(() => window.resetLanyardPhysics?.());
  }
  window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  resetCanvasPalette();
  requestAnimationFrame(markVisibleReveals);
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => setPrototype(tab.dataset.target));
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.18 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const scrollRevealItems = [
  ...document.querySelectorAll(
    [
      ".modern-portfolio > .portfolio-section-heading",
      ".portfolio-split-section > .portfolio-section-heading",
      ".education-section .portfolio-section-heading",
      ".community-section .portfolio-section-heading",
      ".proof-copy .portfolio-section-heading",
      ".portfolio-contact-band > div:first-child",
      ".experience-clean-card",
      ".project-clean-card",
      ".education-card",
      ".community-card",
      ".skill-groups > div",
      ".resume-proof-card",
      ".portfolio-contact-links > *",
    ].join(", ")
  ),
];

const revealGroups = [
  ".experience-clean-list",
  ".project-clean-grid",
  ".education-grid",
  ".skill-groups",
  ".community-grid",
  ".portfolio-contact-links",
];

revealGroups.forEach((selector) => {
  document.querySelectorAll(selector).forEach((group) => {
    [...group.children].forEach((child, index) => {
      child.style.setProperty("--reveal-delay", `${Math.min(index * 80, 320)}ms`);
    });
  });
});

if (reduceMotion) {
  scrollRevealItems.forEach((element) => element.classList.add("is-visible"));
} else {
  const scrollRevealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          scrollRevealObserver.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
  );

  scrollRevealItems.forEach((element) => {
    element.classList.add("scroll-reveal");
    scrollRevealObserver.observe(element);
  });
}

function markVisibleReveals() {
  document.querySelectorAll(".prototype.is-active .reveal").forEach((element) => {
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9 && rect.bottom > 0) {
      element.classList.add("is-visible");
    }
  });
}

function updateProgress() {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = total <= 0 ? 0 : window.scrollY / total;
  progress.style.width = `${Math.min(1, Math.max(0, ratio)) * 100}%`;
}

window.addEventListener("scroll", updateProgress, { passive: true });
window.addEventListener("resize", updateProgress);
updateProgress();
markVisibleReveals();

const portfolioNavLinks = [...document.querySelectorAll(".portfolio-jump-nav a")];
const portfolioNavTargets = portfolioNavLinks
  .map((link) => {
    const target = document.querySelector(link.getAttribute("href"));
    return target ? { link, target } : null;
  })
  .filter(Boolean);

function updatePortfolioNavState() {
  if (!portfolioNavTargets.length) return;

  const triggerY = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-height")) + 150;
  let active = portfolioNavTargets[0];

  portfolioNavTargets.forEach((item) => {
    if (item.target.getBoundingClientRect().top <= triggerY) {
      active = item;
    }
  });

  portfolioNavTargets.forEach(({ link }) => {
    const isActive = link === active.link;
    link.classList.toggle("is-active", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "true");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

let navStateFrame = 0;
function requestPortfolioNavState() {
  if (navStateFrame) return;
  navStateFrame = window.requestAnimationFrame(() => {
    navStateFrame = 0;
    updatePortfolioNavState();
  });
}

window.addEventListener("scroll", requestPortfolioNavState, { passive: true });
window.addEventListener("resize", requestPortfolioNavState);
updatePortfolioNavState();

document.querySelectorAll("[data-copy-email]").forEach((control) => {
  const email = control.dataset.copyEmail;

  async function copyEmail() {
    if (!email) return;

    try {
      await navigator.clipboard.writeText(email);
      control.setAttribute("aria-label", "Copied email address");
      control.classList.add("is-copied");
    } catch {
      control.setAttribute("aria-label", "Select email address");
    }

    window.setTimeout(() => {
      control.setAttribute("aria-label", "Copy email address");
      control.classList.remove("is-copied");
    }, 1400);
  }

  control.addEventListener("click", () => {
    if (window.getSelection?.().toString()) return;
    copyEmail();
  });
  control.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    copyEmail();
  });
});

if (!reduceMotion && cursor) {
  window.addEventListener(
    "pointermove",
    (event) => {
      cursor.classList.add("is-visible");
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
    },
    { passive: true }
  );

  document.querySelectorAll("a, button, .tilt-card").forEach((element) => {
    element.addEventListener("pointerenter", () => cursor.classList.add("is-large"));
    element.addEventListener("pointerleave", () => cursor.classList.remove("is-large"));
  });
}

document.querySelectorAll(".tilt-card").forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    if (reduceMotion || window.innerWidth < 760) return;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `rotateX(${y * -7}deg) rotateY(${x * 8}deg) translateY(-2px)`;
  });

  card.addEventListener("pointerleave", () => {
    card.style.transform = "";
  });
});

const roleButtons = [...document.querySelectorAll(".role-button")];
const roleDate = document.querySelector("[data-role-date]");
const roleTitle = document.querySelector("[data-role-title]");
const roleSummary = document.querySelector("[data-role-summary]");
const roleTags = document.querySelector("[data-role-tags]");

function selectRole(roleName) {
  const role = roles[roleName];
  if (!role) return;

  roleButtons.forEach((button) => {
    const isActive = button.dataset.role === roleName;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });

  roleDate.textContent = role.date;
  roleTitle.textContent = role.title;
  roleSummary.textContent = role.summary;
  roleTags.replaceChildren(
    ...role.tags.map((tag) => {
      const element = document.createElement("span");
      element.textContent = tag;
      return element;
    })
  );
}

roleButtons.forEach((button) => {
  button.addEventListener("click", () => selectRole(button.dataset.role));
});

const lanyardScene = document.querySelector(".lanyard-scene");
const lanyardArticle = document.querySelector(".prototype-lanyard");
const lanyardBadge = document.querySelector("[data-badge]");
const lanyardScanner = document.querySelector("[data-scanner]");
const scanOutput = document.querySelector("[data-scan-output]");
const scanInstruction = document.querySelector(".scan-instruction");
const unlockCopyPanel = document.querySelector(".unlock-copy-panel");
const ropePath = document.querySelector("[data-rope-path]");
const ropeShadow = document.querySelector("[data-rope-shadow]");
const ropeThread = document.querySelector("[data-rope-thread]");
const strapIcons = [...document.querySelectorAll("[data-strap-icon]")];
const fallbackScan = document.querySelector("[data-fallback-scan]");

function revealUnlockedPortfolio() {
  const portfolioSection = document.querySelector(".prototype-lanyard .lab-section");

  lanyardScene?.classList.add("is-unlocked");
  lanyardScene?.classList.remove("is-near");
  lanyardArticle?.classList.add("is-unlocked");
  scanOutput?.setAttribute("aria-hidden", "false");
  unlockCopyPanel?.setAttribute("aria-hidden", "false");
  scanInstruction?.setAttribute("aria-hidden", "true");
  portfolioSection?.classList.add("is-visible");

  window.setTimeout(() => {
    portfolioSection?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  }, reduceMotion ? 0 : 2600);
}

fallbackScan?.addEventListener("click", revealUnlockedPortfolio);
window.unlockLanyardPortfolio = revealUnlockedPortfolio;

function setupLanyardPhysics() {
  if (!lanyardScene || !lanyardBadge || !lanyardScanner || !ropePath || !ropeShadow || !ropeThread) return;

  const state = {
    width: 0,
    height: 0,
    segment: 0,
    dragging: false,
    hasDragged: false,
    unlocked: false,
    badgeWidth: 322,
    badgeHeight: 438,
    pointerOffset: { x: 0, y: 0 },
    points: [],
    lastTime: performance.now(),
  };

  function makePoint(x, y, pinned = false) {
    return { x, y, oldX: x, oldY: y, pinned };
  }

  function scenePoint(event) {
    const rect = lanyardScene.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }

  function resetLanyard() {
    const rect = lanyardScene.getBoundingClientRect();
    const badgeRect = lanyardBadge.getBoundingClientRect();
    const badgeWidth = badgeRect.width || 322;
    const badgeHeight = badgeRect.height || 438;
    state.width = rect.width;
    state.height = rect.height;
    state.badgeWidth = badgeWidth;
    state.badgeHeight = badgeHeight;
    state.hasDragged = false;
    const isCompact = state.width < 560;
    const edgeMargin = isCompact ? 10 : 42;
    const anchor = { x: state.width * 0.5, y: isCompact ? -30 : -86 };
    const end = {
      x: Math.min(state.width * (isCompact ? 0.82 : 0.76), state.width - badgeWidth / 2 - edgeMargin),
      y: Math.min(state.height * (isCompact ? 0.62 : 0.48), state.height - badgeHeight + 24),
    };
    state.segment = Math.max(52, Math.hypot(end.x - anchor.x, end.y - anchor.y) / 3);
    state.points = [
      makePoint(anchor.x, anchor.y, true),
      makePoint(anchor.x + (end.x - anchor.x) * 0.32, anchor.y + (end.y - anchor.y) * 0.34),
      makePoint(anchor.x + (end.x - anchor.x) * 0.66, anchor.y + (end.y - anchor.y) * 0.68),
      makePoint(end.x, end.y),
    ];
  }

  function cubicPoint(p0, p1, p2, p3, t) {
    const inv = 1 - t;
    const a = inv * inv * inv;
    const b = 3 * inv * inv * t;
    const c = 3 * inv * t * t;
    const d = t * t * t;
    return {
      x: a * p0.x + b * p1.x + c * p2.x + d * p3.x,
      y: a * p0.y + b * p1.y + c * p2.y + d * p3.y,
    };
  }

  function constrainRope() {
    for (let iteration = 0; iteration < 8; iteration += 1) {
      for (let index = 0; index < state.points.length - 1; index += 1) {
        const first = state.points[index];
        const second = state.points[index + 1];
        const dx = second.x - first.x;
        const dy = second.y - first.y;
        const distance = Math.max(0.001, Math.hypot(dx, dy));
        const difference = (distance - state.segment) / distance;
        const offsetX = dx * difference * 0.5;
        const offsetY = dy * difference * 0.5;

        if (!first.pinned) {
          first.x += offsetX;
          first.y += offsetY;
        }
        if (!second.pinned && !(state.dragging && index === state.points.length - 2)) {
          second.x -= offsetX;
          second.y -= offsetY;
        }
      }
    }
  }

  function clampPoint(point, margin = 18) {
    point.x = Math.max(margin, Math.min(state.width - margin, point.x));
    point.y = Math.max(margin, Math.min(state.height - margin, point.y));
  }

  function clampBadgePoint(point) {
    point.x = Math.max(
      state.badgeWidth / 2 + 16,
      Math.min(state.width - state.badgeWidth / 2 - 16, point.x)
    );
    point.y = Math.max(72, Math.min(state.height - state.badgeHeight + 28, point.y));
  }

  function scannerHitbox() {
    const sceneRect = lanyardScene.getBoundingClientRect();
    const scannerRect = lanyardScanner.getBoundingClientRect();
    return {
      left: scannerRect.left - sceneRect.left - 26,
      right: scannerRect.right - sceneRect.left + 42,
      top: scannerRect.top - sceneRect.top - 30,
      bottom: scannerRect.bottom - sceneRect.top + 30,
      centerX: scannerRect.left - sceneRect.left + scannerRect.width * 0.52,
      centerY: scannerRect.top - sceneRect.top + scannerRect.height * 0.5,
    };
  }

  function updateScanState() {
    const badgePoint = state.points[3];
    const hitbox = scannerHitbox();
    const near =
      badgePoint.x > hitbox.left &&
      badgePoint.x < hitbox.right &&
      badgePoint.y > hitbox.top &&
      badgePoint.y < hitbox.bottom;

    lanyardScene.classList.toggle("is-near", near && state.hasDragged && !state.unlocked);

    if (near && state.hasDragged && !state.unlocked) {
      unlockPortfolio(hitbox);
    }
  }

  function unlockPortfolio(hitbox = scannerHitbox()) {
    if (state.unlocked) return;
    state.unlocked = true;
    state.dragging = false;
    revealUnlockedPortfolio();

    const badgePoint = state.points[3];
    badgePoint.x = hitbox.centerX + 36;
    badgePoint.y = hitbox.centerY;
    badgePoint.oldX = badgePoint.x;
    badgePoint.oldY = badgePoint.y;

  }

  function drawRopeAndBadge() {
    const [p0, p1, p2, p3] = state.points;
    const scaleX = 100 / Math.max(1, state.width);
    const scaleY = 100 / Math.max(1, state.height);
    const path = `M ${p0.x * scaleX} ${p0.y * scaleY} C ${p1.x * scaleX} ${p1.y * scaleY}, ${p2.x * scaleX} ${p2.y * scaleY}, ${p3.x * scaleX} ${p3.y * scaleY}`;
    ropePath.setAttribute("d", path);
    ropeShadow.setAttribute("d", path);
    ropeThread.setAttribute("d", path);
    strapIcons.forEach((icon, index) => {
      const point = cubicPoint(p0, p1, p2, p3, 0.2 + index * 0.2);
      icon.setAttribute("transform", `translate(${point.x * scaleX} ${point.y * scaleY}) scale(0.042)`);
    });

    const rect = lanyardBadge.getBoundingClientRect();
    const tilt = Math.max(-14, Math.min(14, (p2.x - p3.x) * 0.05));
    const lift = state.dragging ? -8 : 0;
    lanyardBadge.style.transform = `translate(${p3.x - rect.width / 2}px, ${p3.y - 28 + lift}px) rotate(${tilt}deg)`;
  }

  function tick(now) {
    const delta = Math.min(32, now - state.lastTime) / 16.667;
    state.lastTime = now;

    if (!state.unlocked) {
      for (let index = 1; index < state.points.length; index += 1) {
        const point = state.points[index];
        if (state.dragging && index === state.points.length - 1) continue;
        const velocityX = (point.x - point.oldX) * 0.975;
        const velocityY = (point.y - point.oldY) * 0.975;
        point.oldX = point.x;
        point.oldY = point.y;
        point.x += velocityX;
        point.y += velocityY + 0.42 * delta * delta;
        if (index === state.points.length - 1) {
          clampBadgePoint(point);
        } else {
          clampPoint(point);
        }
      }
      constrainRope();
      updateScanState();
    }

    drawRopeAndBadge();
    requestAnimationFrame(tick);
  }

  lanyardBadge.addEventListener("pointerdown", (event) => {
    if (state.unlocked) return;
    const point = scenePoint(event);
    const badgePoint = state.points[3];
    state.dragging = true;
    state.hasDragged = true;
    state.pointerOffset.x = point.x - badgePoint.x;
    state.pointerOffset.y = point.y - badgePoint.y;
    lanyardBadge.setPointerCapture(event.pointerId);
  });

  lanyardBadge.addEventListener("pointermove", (event) => {
    if (!state.dragging || state.unlocked) return;
    const point = scenePoint(event);
    const badgePoint = state.points[3];
    badgePoint.x = point.x - state.pointerOffset.x;
    badgePoint.y = point.y - state.pointerOffset.y;
    badgePoint.oldX = badgePoint.x;
    badgePoint.oldY = badgePoint.y;
    clampBadgePoint(badgePoint);
    constrainRope();
    updateScanState();
    drawRopeAndBadge();
  });

  function endDrag(event) {
    if (!state.dragging) return;
    state.dragging = false;
    try {
      lanyardBadge.releasePointerCapture(event.pointerId);
    } catch {
      // Pointer capture can already be released by the browser.
    }
    updateScanState();
  }

  lanyardBadge.addEventListener("pointerup", endDrag);
  lanyardBadge.addEventListener("pointercancel", endDrag);
  lanyardBadge.addEventListener("focus", () => lanyardScene.classList.add("is-keyboard"));
  lanyardBadge.addEventListener("blur", () => lanyardScene.classList.remove("is-keyboard"));
  lanyardBadge.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      unlockPortfolio();
    }
  });
  window.addEventListener("resize", () => {
    if (!state.dragging && !state.unlocked) resetLanyard();
  });

  window.resetLanyardPhysics = () => {
    if (state.unlocked || state.dragging) return;
    resetLanyard();
    drawRopeAndBadge();
  };

  resetLanyard();
  requestAnimationFrame(tick);
}

setupLanyardPhysics();

const canvas = document.getElementById("motion-canvas");
const context = canvas.getContext("2d");
let width = 0;
let height = 0;
let particles = [];
let palette = [];
let animationFrame = 0;

function hexToRgb(color) {
  const normalized = color.trim();
  if (!normalized.startsWith("#")) return [255, 255, 255];
  const value = normalized.slice(1);
  const full = value.length === 3 ? value.split("").map((char) => char + char).join("") : value;
  const numeric = Number.parseInt(full, 16);
  return [(numeric >> 16) & 255, (numeric >> 8) & 255, numeric & 255];
}

function rgba(color, alpha) {
  const [red, green, blue] = hexToRgb(color);
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

function resetCanvasPalette() {
  const styles = getComputedStyle(body);
  palette = [
    styles.getPropertyValue("--accent").trim(),
    styles.getPropertyValue("--accent-2").trim(),
    styles.getPropertyValue("--accent-3").trim(),
  ];
}

function resizeCanvas() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.floor(width * ratio);
  canvas.height = Math.floor(height * ratio);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  context.setTransform(ratio, 0, 0, ratio, 0, 0);

  const particleCount = Math.round(Math.min(96, Math.max(42, width / 16)));
  particles = Array.from({ length: particleCount }, (_, index) => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.42,
    vy: (Math.random() - 0.5) * 0.42,
    size: Math.random() * 2.1 + 0.8,
    color: palette[index % palette.length],
    phase: Math.random() * Math.PI * 2,
  }));
}

function activeMode() {
  if (body.classList.contains("mode-kinetic")) return "kinetic";
  if (body.classList.contains("mode-lanyard")) return "lanyard";
  return "command";
}

function drawCommandParticle(particle, time) {
  context.beginPath();
  context.fillStyle = rgba(particle.color, 0.55);
  context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
  context.fill();

  particle.x += particle.vx;
  particle.y += particle.vy;
  if (particle.x < -20) particle.x = width + 20;
  if (particle.x > width + 20) particle.x = -20;
  if (particle.y < -20) particle.y = height + 20;
  if (particle.y > height + 20) particle.y = -20;

  const wave = Math.sin(time * 0.001 + particle.phase) * 0.2;
  particle.x += wave;
}

function drawKineticParticle(particle, time, index) {
  const length = 26 + Math.sin(time * 0.001 + particle.phase) * 12;
  context.strokeStyle = rgba(particle.color, 0.26);
  context.lineWidth = 1.1;
  context.beginPath();
  context.moveTo(particle.x, particle.y);
  context.lineTo(particle.x + length, particle.y + length * 0.28);
  context.stroke();

  particle.x += 0.38 + index * 0.0008;
  particle.y += particle.vy * 0.3;
  if (particle.x > width + 42) particle.x = -42;
  if (particle.y < -20) particle.y = height + 20;
  if (particle.y > height + 20) particle.y = -20;
}

function drawLanyardParticle(particle, time) {
  const pulse = Math.sin(time * 0.002 + particle.phase) * 0.5 + 0.5;
  context.save();
  context.translate(particle.x, particle.y);
  context.rotate(time * 0.00025 + particle.phase);
  context.strokeStyle = rgba(particle.color, 0.18 + pulse * 0.26);
  context.lineWidth = 1.2;
  context.strokeRect(-particle.size * 4, -particle.size * 4, particle.size * 8, particle.size * 8);
  context.restore();

  particle.y -= 0.2 + pulse * 0.16;
  particle.x += particle.vx * 0.55;
  if (particle.y < -30) {
    particle.y = height + 30;
    particle.x = Math.random() * width;
  }
}

function drawConnections() {
  const mode = activeMode();
  if (mode === "kinetic") return;
  const maxDistance = mode === "lanyard" ? 92 : 118;

  for (let index = 0; index < particles.length; index += 1) {
    for (let nextIndex = index + 1; nextIndex < particles.length; nextIndex += 1) {
      const first = particles[index];
      const second = particles[nextIndex];
      const dx = first.x - second.x;
      const dy = first.y - second.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < maxDistance) {
        const alpha = (1 - distance / maxDistance) * (mode === "lanyard" ? 0.16 : 0.22);
        context.strokeStyle = rgba(first.color, alpha);
        context.lineWidth = 1;
        context.beginPath();
        context.moveTo(first.x, first.y);
        context.lineTo(second.x, second.y);
        context.stroke();
      }
    }
  }
}

function drawCanvas(time = 0) {
  context.clearRect(0, 0, width, height);
  const mode = activeMode();

  particles.forEach((particle, index) => {
    if (mode === "kinetic") {
      drawKineticParticle(particle, time, index);
    } else if (mode === "lanyard") {
      drawLanyardParticle(particle, time);
    } else {
      drawCommandParticle(particle, time);
    }
  });

  drawConnections();
  animationFrame = requestAnimationFrame(drawCanvas);
}

resetCanvasPalette();
resizeCanvas();
window.addEventListener("resize", () => {
  resetCanvasPalette();
  resizeCanvas();
});

if (!reduceMotion) {
  drawCanvas();
} else {
  drawCanvas(0);
  cancelAnimationFrame(animationFrame);
}
