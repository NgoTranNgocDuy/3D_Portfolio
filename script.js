const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const navLinks = [...document.querySelectorAll('.nav-link')];
const sections = [...document.querySelectorAll('main section[id]')];

menuToggle.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.forEach((link) => link.addEventListener('click', () => {
  siteNav.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

const updateNavigation = () => {
  header.classList.toggle('is-scrolled', window.scrollY > 24);
  document.documentElement.style.setProperty('--scroll-progress', `${window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)}`);
  const current = sections.find((section) => window.scrollY >= section.offsetTop - 180 && window.scrollY < section.offsetTop + section.offsetHeight - 180);
  navLinks.forEach((link) => link.classList.toggle('is-active', current ? link.getAttribute('href') === `#${current.id}` : link.getAttribute('href') === '#home'));
};

window.addEventListener('scroll', updateNavigation, { passive: true });
updateNavigation();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element, index) => {
  element.style.setProperty('--reveal-delay', `${Math.min(index * 45, 260)}ms`);
  observer.observe(element);
});

if (!prefersReducedMotion && window.matchMedia('(pointer: fine)').matches) {
  document.querySelectorAll('.project-card').forEach((card) => {
    let frame;

    const resetCard = () => {
      card.style.setProperty('--tilt-x', '0deg');
      card.style.setProperty('--tilt-y', '0deg');
      card.style.setProperty('--shine-x', '50%');
      card.style.setProperty('--shine-y', '50%');
    };

    card.addEventListener('pointermove', (event) => {
      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width;
      const y = (event.clientY - bounds.top) / bounds.height;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        card.style.setProperty('--tilt-x', `${(0.5 - y) * 5}deg`);
        card.style.setProperty('--tilt-y', `${(x - 0.5) * 5}deg`);
        card.style.setProperty('--shine-x', `${x * 100}%`);
        card.style.setProperty('--shine-y', `${y * 100}%`);
      });
    });

    card.addEventListener('pointerleave', resetCard);
    resetCard();
  });

  const heroVisual = document.querySelector('.hero-visual');
  window.addEventListener('pointermove', (event) => {
    if (!heroVisual || window.scrollY > window.innerHeight) return;
    const x = (event.clientX / window.innerWidth - 0.5) * 8;
    const y = (event.clientY / window.innerHeight - 0.5) * 8;
    heroVisual.style.setProperty('--hero-x', `${x}px`);
    heroVisual.style.setProperty('--hero-y', `${y}px`);
  }, { passive: true });
}