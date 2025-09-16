// CrownJewel - Euphoria-style behavior
document.addEventListener('DOMContentLoaded', () => {
  /* ===== Mobile Drawer Toggle ===== */
  const drawer = document.getElementById('drawer');
  const menuBtn = document.getElementById('menuButton');

  if (menuBtn && drawer) {
    const open = () => {
      drawer.classList.add('open');
      drawer.hidden = false;
      menuBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    };
    const close = () => {
      drawer.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      setTimeout(() => { if (!drawer.classList.contains('open')) drawer.hidden = true; }, 250);
    };

    menuBtn.addEventListener('click', () => {
      drawer.classList.contains('open') ? close() : open();
    });

    drawer.addEventListener('click', (e) => {
      if (e.target.tagName.toLowerCase() === 'a') close();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('open')) close();
    });

    document.addEventListener('click', (e) => {
      const isClickOutside = drawer.classList.contains('open') &&
                             !drawer.contains(e.target) &&
                             e.target !== menuBtn;
      if (isClickOutside) close();
    });
  }

  /* ===== Smooth Anchor Scrolling (nice touch) ===== */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length > 1) {
        const el = document.querySelector(id);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
});
