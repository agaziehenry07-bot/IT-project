const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');
const navbar    = document.getElementById('navbar');
 
hamburger.addEventListener('click', (e) => {
  e.stopPropagation();
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
 
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});
 
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  }
});
 
// ── Sticky Navbar ────────────────────────────────────────────
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});
 
// ── Smooth Scroll ────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
 
// ── Scroll Fade-in Animations ────────────────────────────────
const fadeEls = document.querySelectorAll(
  '.service-card, .about-text, .about-stat, .contact-form, .section-header'
);
 
fadeEls.forEach(el => el.classList.add('fade-up'));
 
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const siblings = [...entry.target.parentElement.children];
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, idx * 100);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
 
fadeEls.forEach(el => observer.observe(el));
 
// ── Form Validation ──────────────────────────────────────────
const form       = document.getElementById('contact-form');
const successMsg = document.getElementById('form-success');
 
function setError(id, msg) {
  const el    = document.getElementById(`${id}-error`);
  const input = document.getElementById(id);
  if (el)    el.textContent = msg;
  if (input) input.classList.toggle('invalid', !!msg);
}
 
['name', 'email', 'message'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('input', () => setError(id, ''));
});
 
form.addEventListener('submit', (e) => {
  e.preventDefault();
  let ok = true;
 
  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 
  setError('name', ''); setError('email', ''); setError('message', '');
 
  if (!name)                          { setError('name',    'Please enter your full name.');            ok = false; }
  if (!email || !emailRx.test(email)) { setError('email',   'Please enter a valid email address.');     ok = false; }
  if (!message || message.length < 10){ setError('message', 'Please write at least 10 characters.');   ok = false; }
 
  if (ok) {
    successMsg.style.display = 'block';
    form.reset();
    setTimeout(() => { successMsg.style.display = 'none'; }, 4000);
  }
});
});
