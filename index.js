// Sticky header
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 90) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
  });
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navbar = document.querySelector('.navbar');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navbar.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    const isOpen = navbar.classList.contains('open');
    spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
    spans[1].style.opacity   = isOpen ? '0' : '';
    spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navbar.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });
}

// Scroll-reveal
const revealEls = document.querySelectorAll(
  '.service-card, .portfolio-card, .about-content, .about-img, .contact-info, .contact-form'
);

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Contact form
function handleSubmit(btn) {
  const form = btn.closest('.contact-form');
  const inputs = form.querySelectorAll('input, textarea');
  let valid = true;

  inputs.forEach(input => {
    if (input.hasAttribute('required') && !input.value.trim()) {
      input.style.borderColor = '#e74c3c';
      valid = false;
    } else {
      input.style.borderColor = '';
    }
  });

  if (!valid) return;

  btn.textContent = 'Sending…';
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = '✓ Message Sent!';
    btn.style.background = 'lightgreen';
    btn.style.color = '#081b29';

    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.style.background = '';
      btn.style.color = '';
      btn.disabled = false;
      inputs.forEach(i => i.value = '');
    }, 3000);
  }, 1200);
}