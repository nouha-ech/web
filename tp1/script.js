/* ─────────────────────────────────────────
   script.js — Portfolio Nohaila Echchnaoui
───────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {

  /* ═══ 1. BURGER MENU (mobile) ═══ */
  const burger = document.getElementById('burger');
  const navList = document.querySelector('nav ul');

  if (burger && navList) {
    burger.addEventListener('click', () => {
      const isOpen = navList.classList.toggle('open');
      burger.classList.toggle('open', isOpen);
      burger.setAttribute('aria-expanded', String(isOpen));
    });

    // Ferme le menu quand on clique sur un lien
    navList.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navList.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }


  /* ═══ 2. ACTIVE NAV LINK on scroll ═══ */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav ul li a');

  function setActiveLink() {
    let currentId = '';
    sections.forEach(section => {
      const top = section.offsetTop - 100;
      if (window.scrollY >= top) {
        currentId = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + currentId);
    });
  }

  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();


  /* ═══ 3. SCROLL REVEAL ═══ */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // stagger each card slightly
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, i * 80);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealEls.forEach(el => revealObserver.observe(el));


  /* ═══ 4. CONTACT FORM ═══ */
  const form = document.getElementById('contact-form');
  const statusEl = document.getElementById('form-status');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const email = form.email.value.trim();
      const message = form.message.value.trim();

      // Validation simple
      if (!email || !message) {
        showStatus('Veuillez remplir tous les champs.', 'error');
        return;
      }

      if (!isValidEmail(email)) {
        showStatus('Veuillez entrer une adresse e-mail valide.', 'error');
        return;
      }

      // Simulation d'envoi (remplacer par fetch() vers un vrai endpoint)
      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = 'Envoi en cours…';

      setTimeout(() => {
        showStatus('✓ Message envoyé avec succès ! Je vous répondrai bientôt.', 'success');
        form.reset();
        btn.disabled = false;
        btn.textContent = 'Envoyer';
      }, 1200);
    });
  }

  function showStatus(msg, type) {
    if (!statusEl) return;
    statusEl.textContent = msg;
    statusEl.className = 'form-status ' + type;
    // Clear after 5s
    setTimeout(() => {
      statusEl.textContent = '';
      statusEl.className = 'form-status';
    }, 5000);
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

});
