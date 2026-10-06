/* ─────────────────────────────────────────────────────────────
   ANDREW NGO — PORTFOLIO SCRIPTS
   Sections:
     1. Feature detection
     2. Loader
     3. Custom cursor
     4. Scroll progress + nav highlight
     5. Smooth nav + mobile menu
     6. Hero canvas (particle field)
     7. Reveal on scroll (IntersectionObserver)
     8. Text scramble
     9. Magnetic buttons
    10. Skill bar animation
    11. 3D tilt on project cards
────────────────────────────────────────────────────────────── */

const pref = {
  motion: !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  pointer: window.matchMedia('(pointer: fine)').matches,
};

/* ─── 2. LOADER ────────────────────────────────────────────── */
(function initLoader() {
  const loader = document.getElementById('loader');
  const fill   = loader.querySelector('.loader-fill');
  const label  = loader.querySelector('.loader-label');

  const steps = ['Initialising...', 'Loading assets...', 'Almost ready...'];
  let step = 0;

  fill.style.width = '0%';

  function progress() {
    step++;
    const pct = step * 33;
    fill.style.width = `${pct}%`;
    if (steps[step]) label.textContent = steps[step];
  }

  const t1 = setTimeout(progress, 200);
  const t2 = setTimeout(progress, 550);

  window.addEventListener('load', () => {
    clearTimeout(t1); clearTimeout(t2);
    fill.style.width = '100%';
    label.textContent = 'Ready.';
    setTimeout(() => {
      loader.classList.add('is-done');
      document.body.style.cursor = '';
    }, 340);
  }, { once: true });
})();


/* ─── 3. CUSTOM CURSOR ─────────────────────────────────────── */
(function initCursor() {
  if (!pref.pointer) return;

  const cursor = document.getElementById('cursor');
  const dot    = cursor.querySelector('.cursor-dot');
  const ring   = cursor.querySelector('.cursor-ring');

  // Hide cursor elements until first mouse move — prevents flash at (0,0)
  cursor.style.opacity = '0';

  let mx = -300, my = -300;
  let rx = -300, ry = -300;
  let hasMoved = false;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;

    // Snap dot immediately — feels responsive
    dot.style.transform = `translate(calc(${mx}px - 50%), calc(${my}px - 50%))`;

    if (!hasMoved) {
      // First move: show cursor and add cursor-ready to body (hides system cursor)
      hasMoved = true;
      rx = mx; ry = my;
      cursor.style.opacity = '1';
      document.body.classList.add('cursor-ready');
    }
  }, { passive: true });

  function lerp(a, b, t) { return a + (b - a) * t; }

  // Ring follows with smooth lag
  function tick() {
    rx = lerp(rx, mx, 0.11);
    ry = lerp(ry, my, 0.11);
    ring.style.transform = `translate(calc(${rx}px - 50%), calc(${ry}px - 50%))`;
    requestAnimationFrame(tick);
  }
  tick();

  // Hover states — use event delegation on document for reliability
  function onEnter() { cursor.classList.add('is-hover'); }
  function onLeave() { cursor.classList.remove('is-hover'); }

  const hoverTargets = 'a, button, [data-magnetic], .project-card, .tl-card, .skill-group, .nav-link, .nav-resume';

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverTargets)) onEnter();
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverTargets)) onLeave();
  });

  document.addEventListener('mousedown', () => cursor.classList.add('is-click'));
  document.addEventListener('mouseup',   () => cursor.classList.remove('is-click'));

  // Hide system cursor if it somehow reappears (e.g. leaving/re-entering window)
  document.addEventListener('mouseenter', () => {
    if (hasMoved) document.body.classList.add('cursor-ready');
  });
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    document.body.classList.remove('cursor-ready');
  });
  document.addEventListener('mouseenter', () => {
    if (hasMoved) cursor.style.opacity = '1';
  });
})();


/* ─── 4. SCROLL PROGRESS + NAV HIGHLIGHT ──────────────────── */
(function initScroll() {
  const header   = document.getElementById('site-header');
  const progress = document.getElementById('scroll-progress');
  const navLinks = [...document.querySelectorAll('.nav-link')];
  const sections = [...document.querySelectorAll('main section[id]')];

  function onScroll() {
    const scrolled = window.scrollY;
    const total    = document.documentElement.scrollHeight - window.innerHeight;
    const pct      = total > 0 ? (scrolled / total) * 100 : 0;

    progress.style.width = `${pct}%`;
    header.classList.toggle('is-scrolled', scrolled > 24);

    // Active nav link
    const current = sections.find((s) => {
      return scrolled >= s.offsetTop - 200 && scrolled < s.offsetTop + s.offsetHeight - 200;
    });

    navLinks.forEach((link) => {
      const id = link.getAttribute('data-section') || link.getAttribute('href').slice(1);
      link.classList.toggle('is-active', current ? current.id === id : id === 'home');
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();


/* ─── 5. SMOOTH NAV + MOBILE MENU ─────────────────────────── */
(function initNav() {
  const toggle = document.getElementById('menu-toggle');
  const nav    = document.getElementById('site-nav');
  const links  = [...document.querySelectorAll('.nav-link')];

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  links.forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Smooth scroll — custom easing gives precise, controllable feel
  // (native scrollIntoView smooth can feel uncontrollable on some browsers)
  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function smoothScrollTo(targetY, duration) {
    const startY    = window.scrollY;
    const distance  = targetY - startY;
    const startTime = performance.now();

    function step(now) {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease     = easeInOutCubic(progress);
      window.scrollTo(0, startY + distance * ease);
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const navH   = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 68;
      const targetY = target.getBoundingClientRect().top + window.scrollY - navH - 16;
      // Duration scales with distance — short distances feel snappy, long ones feel smooth
      const distance = Math.abs(targetY - window.scrollY);
      const duration = Math.min(Math.max(distance * 0.5, 300), 900);
      smoothScrollTo(targetY, duration);
    });
  });
})();


/* ─── 6. HERO CANVAS (particle field) ─────────────────────── */
(function initCanvas() {
  if (!pref.motion) return;

  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles = [], mouseX = 0, mouseY = 0;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  const PARTICLE_COUNT = 60;
  const ACCENT_COLOR   = '79,110,247';
  const CYAN_COLOR     = '127,221,255';

  function createParticle() {
    const isCyan = Math.random() > .7;
    return {
      x:    Math.random() * W,
      y:    Math.random() * H,
      r:    Math.random() * 1.4 + .4,
      vx:   (Math.random() - .5) * .25,
      vy:   (Math.random() - .5) * .25,
      color: isCyan ? CYAN_COLOR : ACCENT_COLOR,
      alpha: Math.random() * .5 + .1,
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: PARTICLE_COUNT }, createParticle);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          const alpha = (1 - dist / 120) * .12;
          ctx.strokeStyle = `rgba(79,110,247,${alpha})`;
          ctx.lineWidth = .5;
          ctx.stroke();
        }
      }
    }

    // Draw particles
    particles.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
      ctx.fill();
    });
  }

  function update() {
    particles.forEach((p) => {
      // Gentle mouse repel
      const dx = p.x - mouseX, dy = p.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 80) {
        p.vx += (dx / dist) * .12;
        p.vy += (dy / dist) * .12;
      }

      // Dampen velocity
      p.vx *= .98;
      p.vy *= .98;

      p.x += p.vx;
      p.y += p.vy;

      // Wrap
      if (p.x < -10) p.x = W + 10;
      if (p.x > W + 10) p.x = -10;
      if (p.y < -10) p.y = H + 10;
      if (p.y > H + 10) p.y = -10;
    });
  }

  let frameId;
  function loop() {
    update();
    draw();
    frameId = requestAnimationFrame(loop);
  }

  init();
  loop();

  window.addEventListener('resize', () => {
    resize();
    particles.forEach((p) => {
      if (p.x > W) p.x = Math.random() * W;
      if (p.y > H) p.y = Math.random() * H;
    });
  }, { passive: true });

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  // Pause when not visible
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(frameId);
    else loop();
  });
})();


/* ─── 7. REVEAL ON SCROLL ──────────────────────────────────── */
(function initReveal() {
  const els = document.querySelectorAll('.reveal-fade, .reveal-up, .reveal-left');

  els.forEach((el) => {
    const delay = el.dataset.delay || 0;
    el.style.transitionDelay = `${delay}ms`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  els.forEach((el) => observer.observe(el));
})();


/* ─── 8. TEXT SCRAMBLE ─────────────────────────────────────── */
(function initScramble() {
  if (!pref.motion) return;

  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';

  class TextScramble {
    constructor(el) {
      this.el = el;
      this.original = el.textContent;
      this.frame = 0;
      this.queue = [];
      this.raf = null;
    }

    scramble(text) {
      const old = this.el.textContent;
      const len = Math.max(old.length, text.length);
      this.queue = [];

      for (let i = 0; i < len; i++) {
        const from = old[i] || '';
        const to   = text[i] || '';
        const start = Math.floor(Math.random() * 10);
        const end   = start + Math.floor(Math.random() * 12) + 4;
        this.queue.push({ from, to, start, end, char: '' });
      }

      cancelAnimationFrame(this.raf);
      this.frame = 0;
      this.update();
    }

    update() {
      let output = '';
      let complete = 0;

      for (let i = 0; i < this.queue.length; i++) {
        const { from, to, start, end } = this.queue[i];
        if (this.frame >= end) {
          complete++;
          output += to;
        } else if (this.frame >= start) {
          if (!this.queue[i].char || Math.random() < .28) {
            this.queue[i].char = CHARS[Math.floor(Math.random() * CHARS.length)];
          }
          output += `<span style="color:var(--accent-light);opacity:.5">${this.queue[i].char}</span>`;
        } else {
          output += from;
        }
      }

      this.el.innerHTML = output;
      if (complete < this.queue.length) {
        this.frame++;
        this.raf = requestAnimationFrame(() => this.update());
      }
    }
  }

  // Run scramble on hero headline lines when they enter view
  const scrambleEls = document.querySelectorAll('[data-scramble]');
  scrambleEls.forEach((el) => {
    const ts = new TextScramble(el);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // stagger
          const delay = el.dataset.scrambleDelay || 0;
          setTimeout(() => ts.scramble(ts.original), parseInt(delay));
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    observer.observe(el);
  });
})();


/* ─── 9. MAGNETIC BUTTONS ──────────────────────────────────── */
(function initMagnetic() {
  if (!pref.pointer || !pref.motion) return;

  document.querySelectorAll('[data-magnetic]').forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const cx   = rect.left + rect.width / 2;
      const cy   = rect.top  + rect.height / 2;
      const dx   = (e.clientX - cx) * .28;
      const dy   = (e.clientY - cy) * .28;
      el.style.setProperty('--mx', `${dx}px`);
      el.style.setProperty('--my', `${dy}px`);
    });

    el.addEventListener('mouseleave', () => {
      el.style.setProperty('--mx', '0px');
      el.style.setProperty('--my', '0px');
    });
  });
})();


/* ─── 10. SKILL BAR ANIMATION ──────────────────────────────── */
(function initSkills() {
  const bars = document.querySelectorAll('.skill-fill');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const bar   = entry.target;
        const width = bar.dataset.width;
        // Stagger each bar slightly
        const idx = [...bar.closest('.skill-items').querySelectorAll('.skill-fill')].indexOf(bar);
        setTimeout(() => {
          bar.style.width = `${width}%`;
        }, idx * 80);
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach((bar) => observer.observe(bar));
})();


/* ─── 11. 3D TILT ON PROJECT CARDS ─────────────────────────── */
(function initTilt() {
  if (!pref.pointer || !pref.motion) return;

  document.querySelectorAll('.project-card').forEach((card) => {
    let raf;

    card.addEventListener('pointermove', (e) => {
      const rect = card.getBoundingClientRect();
      const x    = (e.clientX - rect.left) / rect.width;
      const y    = (e.clientY - rect.top)  / rect.height;

      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        card.style.setProperty('--tilt-x', `${(0.5 - y) * 6}deg`);
        card.style.setProperty('--tilt-y', `${(x - 0.5) * 6}deg`);
        card.style.setProperty('--shine-x', `${x * 100}%`);
        card.style.setProperty('--shine-y', `${y * 100}%`);
      });
    });

    card.addEventListener('pointerleave', () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        card.style.setProperty('--tilt-x', '0deg');
        card.style.setProperty('--tilt-y', '0deg');
      });
    });
  });
})();
