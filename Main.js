/* =============================
   JOHN KIRBY SOLIVEN — main.js
   ============================= */

// ── CUSTOM CURSOR ──────────────────────────────────
const dot  = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');

let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  dot.style.left  = mouseX + 'px';
  dot.style.top   = mouseY + 'px';
});

// Ring follows with lag
function animateRing() {
  ringX += (mouseX - ringX) * 0.14;
  ringY += (mouseY - ringY) * 0.14;
  ring.style.left = ringX + 'px';
  ring.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

// Cursor grow on hoverable elements
document.querySelectorAll('a, button, .card, .tech-card, .cert-card, .value-item, .contact-link-item, .form-submit').forEach(el => {
  el.addEventListener('mouseenter', () => {
    dot.style.transform  = 'translate(-50%, -50%) scale(2.5)';
    dot.style.opacity    = '0.6';
    ring.style.transform = 'translate(-50%, -50%) scale(1.5)';
    ring.style.borderColor = 'rgba(125,211,252,0.8)';
  });
  el.addEventListener('mouseleave', () => {
    dot.style.transform  = 'translate(-50%, -50%) scale(1)';
    dot.style.opacity    = '1';
    ring.style.transform = 'translate(-50%, -50%) scale(1)';
    ring.style.borderColor = 'rgba(125,211,252,0.5)';
  });
});

// ── NAVBAR SCROLL ──────────────────────────────────
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// ── MOBILE NAV TOGGLE ──────────────────────────────
const toggle = document.getElementById('navToggle');
const nav    = document.querySelector('nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => nav.classList.toggle('open'));
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) nav.classList.remove('open');
  });
}

// ── STAR PARTICLES ─────────────────────────────────
const starsEl = document.getElementById('stars');
if (starsEl) {
  const count = 80;
  for (let i = 0; i < count; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    s.style.cssText = `
      left: ${Math.random() * 100}%;
      top:  ${Math.random() * 100}%;
      --dur: ${2 + Math.random() * 4}s;
      --delay: ${Math.random() * 5}s;
      --op: ${0.3 + Math.random() * 0.6};
      width:  ${Math.random() > 0.7 ? 3 : 2}px;
      height: ${Math.random() > 0.7 ? 3 : 2}px;
    `;
    starsEl.appendChild(s);
  }
}

// ── SCROLL REVEAL (cards) ──────────────────────────
const observerOpts = { threshold: 0.1, rootMargin: '0px 0px -40px 0px' };

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
      revealObserver.unobserve(entry.target);
    }
  });
}, observerOpts);

document.querySelectorAll('.card, .tech-card, .cert-card').forEach(el => {
  el.style.animationPlayState = 'paused';
  revealObserver.observe(el);
});

// ── SKILL BARS ─────────────────────────────────────
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target;
      // Grab the CSS custom property value and apply it
      const w = getComputedStyle(target).getPropertyValue('--w').trim();
      target.style.width = w;
      barObserver.unobserve(target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-fill').forEach(el => {
  barObserver.observe(el);
});

// ── SMOOTH SECTION FADE-IN ─────────────────────────
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity    = '1';
      entry.target.style.transform  = 'translateY(0)';
      sectionObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.cert-card, .value-item, .info-row').forEach(el => {
  el.style.opacity   = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  sectionObserver.observe(el);
});