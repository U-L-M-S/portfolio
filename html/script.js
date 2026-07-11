/* ============================================================
   Levi Seebacher — Portfolio motion layer
   anime.js powered, fully self-hosted, CSP-friendly.
   ============================================================ */

// ---------- Domain-based language redirect ----------
// nginx already serves the matching language per domain; this is the fallback
// for direct hits on a page whose language doesn't match the domain.
(function redirectByDomain() {
  const path = window.location.pathname;
  // an explicitly requested language page always wins
  if (path.includes("index-de.html") || path.includes("index-en.html")) {
    return;
  }
  const wantsGerman = window.location.hostname.endsWith(".de");
  const servedLang = document.documentElement.lang;
  if (servedLang === (wantsGerman ? "de" : "en")) {
    return;
  }
  window.location.replace(wantsGerman ? "/index-de.html" : "/index-en.html");
})();

// ---------- Helpers ----------
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const hasAnime = typeof window.anime === "function";

// ---------- Split a heading into per-word reveal masks ----------
function splitForReveal(el) {
  if (!el || el.dataset.split === "true") return;
  const html = el.innerHTML;
  // preserve <br> and <span class="accent"> markers
  const tokens = html.split(/(<br\s*\/?>(?:\s*))/i);
  let out = "";
  tokens.forEach((chunk) => {
    if (/^<br/i.test(chunk)) { out += chunk; return; }
    // walk inline tags: extract text words while keeping span wrappers
    const tmp = document.createElement("div");
    tmp.innerHTML = chunk;
    out += wrapWords(tmp);
  });
  el.innerHTML = out;
  el.dataset.split = "true";
}

function wrapWords(node) {
  let result = "";
  node.childNodes.forEach((child) => {
    if (child.nodeType === Node.TEXT_NODE) {
      const words = child.textContent.split(/(\s+)/);
      words.forEach((w) => {
        if (!w) return;
        if (/^\s+$/.test(w)) { result += " "; return; }
        result += `<span class="reveal-line"><span class="reveal-inner">${w}</span></span>`;
      });
    } else if (child.nodeType === Node.ELEMENT_NODE) {
      // wrap inner words, then re-emit element with the wrapped inner HTML
      const clone = child.cloneNode(false);
      const innerWrapped = wrapWords(child);
      clone.innerHTML = innerWrapped;
      result += clone.outerHTML;
    }
  });
  return result;
}

// ---------- Hero entrance timeline ----------
function playHeroEntrance() {
  if (prefersReduced) {
    $$(".reveal-inner").forEach((el) => (el.style.transform = "translateY(0)"));
    $$(".float-chip").forEach((el) => (el.style.opacity = "1"));
    return;
  }
  if (!hasAnime) return;

  const tl = anime.timeline({
    easing: "cubicBezier(0.16, 1, 0.3, 1)",
    duration: 900,
  });

  tl.add({
    targets: ".home-tag",
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 700,
  })
    .add(
      {
        targets: ".home h1 .reveal-inner",
        translateY: ["110%", "0%"],
        delay: anime.stagger(60),
      },
      "-=400"
    )
    .add(
      {
        targets: ".home-content h3",
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 700,
      },
      "-=500"
    )
    .add(
      {
        targets: ".home-content p",
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 700,
      },
      "-=500"
    )
    .add(
      {
        targets: ".social-icons a",
        opacity: [0, 1],
        translateY: [16, 0],
        scale: [0.85, 1],
        delay: anime.stagger(80),
        duration: 600,
      },
      "-=400"
    )
    .add(
      {
        targets: ".btn-group .btn",
        opacity: [0, 1],
        translateY: [16, 0],
        delay: anime.stagger(100),
        duration: 600,
      },
      "-=500"
    )
    .add(
      {
        targets: ".home-img",
        opacity: [0, 1],
        scale: [0.9, 1],
        duration: 1000,
      },
      "-=1400"
    )
    .add(
      {
        targets: ".float-chip",
        opacity: [0, 1],
        translateY: [12, 0],
        delay: anime.stagger(140),
        duration: 700,
      },
      "-=500"
    );
}

// ---------- Scroll reveal (sections + headings + content) ----------
function setupScrollReveals() {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;

        if (el.classList.contains("heading")) {
          const inners = $$(".reveal-inner", el);
          if (hasAnime && !prefersReduced) {
            anime({
              targets: inners,
              translateY: ["110%", "0%"],
              easing: "cubicBezier(0.16, 1, 0.3, 1)",
              duration: 900,
              delay: anime.stagger(50),
            });
          } else {
            inners.forEach((i) => (i.style.transform = "translateY(0)"));
          }
        }

        if (el.classList.contains("timeline-items")) {
          el.classList.add("is-drawn");
        }

        if (el.classList.contains("timeline-item")) {
          el.classList.add("is-visible");
        }

        if (el.classList.contains("project-box")) {
          el.classList.add("is-visible");
        }

        if (el.classList.contains("reveal-up")) {
          el.classList.add("is-visible");
        }

        io.unobserve(el);
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
  );

  $$(".heading").forEach((el) => {
    splitForReveal(el);
    io.observe(el);
  });
  $$(".timeline-items").forEach((el) => io.observe(el));
  $$(".timeline-item").forEach((el, i) => {
    el.style.transitionDelay = `${i * 120}ms`;
    io.observe(el);
  });
  $$(".project-box").forEach((el, i) => {
    el.style.transitionDelay = `${i * 120}ms`;
    el.style.transition = `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${i * 120}ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${i * 120}ms, border-color 0.3s ease`;
    io.observe(el);
  });
  $$(".reveal-up").forEach((el) => io.observe(el));
}

// ---------- Magnetic buttons (cursor attraction) ----------
function setupMagnetic() {
  if (prefersReduced) return;
  const isCoarse = window.matchMedia("(hover: none)").matches;
  if (isCoarse) return;

  $$(".magnet").forEach((el) => {
    const strength = 0.35;
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
    });
    el.addEventListener("mouseleave", () => {
      if (!hasAnime) {
        el.style.transform = "translate(0, 0)";
        return;
      }
      anime({
        targets: el,
        translateX: 0,
        translateY: 0,
        duration: 700,
        easing: "spring(1, 80, 10, 0)",
      });
    });
  });
}

// ---------- Spotlight hover on project cards (CSS vars) ----------
function setupSpotlight() {
  $$(".project-box").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty("--x", `${x}%`);
      card.style.setProperty("--y", `${y}%`);
    });
  });
}

// ---------- Cursor-reactive background glow ----------
function setupBgGlow() {
  if (prefersReduced) return;
  const isCoarse = window.matchMedia("(hover: none)").matches;
  if (isCoarse) return;

  let targetX = 50, targetY = 30;
  let currentX = 50, currentY = 30;
  let raf = null;

  window.addEventListener("mousemove", (e) => {
    targetX = (e.clientX / window.innerWidth) * 100;
    targetY = (e.clientY / window.innerHeight) * 100;
    if (!raf) tick();
  });

  function tick() {
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;
    document.documentElement.style.setProperty("--mx", currentX.toFixed(2) + "%");
    document.documentElement.style.setProperty("--my", currentY.toFixed(2) + "%");
    if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
      raf = requestAnimationFrame(tick);
    } else {
      raf = null;
    }
  }
}

// ---------- Scroll progress bar ----------
function setupScrollProgress() {
  const bar = $(".scroll-progress");
  if (!bar) return;
  const update = () => {
    const h = document.documentElement;
    const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
    bar.style.width = `${Math.min(scrolled * 100, 100)}%`;
  };
  window.addEventListener("scroll", update, { passive: true });
  update();
}

// ---------- Active nav link on scroll ----------
function setupActiveNav() {
  const sections = $$("section");
  const navLinks = $$("header nav a");
  const setActive = () => {
    const top = window.scrollY + 200;
    let current = sections[0]?.id;
    sections.forEach((sec) => {
      if (top >= sec.offsetTop) current = sec.id;
    });
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  };
  window.addEventListener("scroll", setActive, { passive: true });
  setActive();
}

// ---------- Text scramble on nav-link hover ----------
const SCRAMBLE_CHARS = "!<>-_\\/[]{}—=+*^?#________0123ABC";
function setupScramble() {
  const isCoarse = window.matchMedia("(hover: none)").matches;
  if (isCoarse || prefersReduced) return;
  $$("header nav a").forEach((a) => {
    const original = a.textContent;
    let frame = 0;
    let interval = null;
    const scramble = () => {
      clearInterval(interval);
      const len = original.length;
      const duration = 28;
      frame = 0;
      interval = setInterval(() => {
        let out = "";
        for (let i = 0; i < len; i++) {
          if (frame >= duration * (i / len)) {
            out += original[i];
          } else {
            out += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          }
        }
        a.textContent = out;
        frame++;
        if (frame > duration + 2) {
          clearInterval(interval);
          a.textContent = original;
        }
      }, 22);
    };
    a.addEventListener("mouseenter", scramble);
  });
}

// ---------- Mobile menu ----------
function setupMobileMenu() {
  const menuIcon = $("#menu-icon");
  const navbar = $(".navbar");
  if (!menuIcon || !navbar) return;
  menuIcon.addEventListener("click", () => {
    menuIcon.classList.toggle("bx-x");
    navbar.classList.toggle("active");
  });
  $$(".navbar a").forEach((a) =>
    a.addEventListener("click", () => {
      menuIcon.classList.remove("bx-x");
      navbar.classList.remove("active");
    })
  );
}

// ---------- Header reveal ----------
function revealHeader() {
  const header = $(".header");
  if (header) requestAnimationFrame(() => header.classList.add("is-ready"));
}

// ---------- Boot ----------
document.addEventListener("DOMContentLoaded", () => {
  // Pre-split the hero heading so the entrance can target word inners
  splitForReveal($(".home h1"));

  revealHeader();
  playHeroEntrance();
  setupScrollReveals();
  setupMagnetic();
  setupSpotlight();
  setupBgGlow();
  setupScrollProgress();
  setupActiveNav();
  setupScramble();
  setupMobileMenu();
});
