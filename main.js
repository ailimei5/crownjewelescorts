// Wait until the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  /* =========================
     MOBILE DRAWER TOGGLE
     ========================= */
  const drawer = document.getElementById('drawer');
  const menuBtn = document.querySelector('.menu');

  if (menuBtn && drawer) {
    menuBtn.addEventListener('click', () => {
      drawer.classList.toggle('open');
      // Prevent background scroll when open
      if (drawer.classList.contains('open')) {
        document.body.style.overflow = 'hidden';
        menuBtn.setAttribute('aria-expanded', 'true');
        drawer.hidden = false;
      } else {
        document.body.style.overflow = '';
        menuBtn.setAttribute('aria-expanded', 'false');
        // Wait for animation then hide
        setTimeout(() => { if (!drawer.classList.contains('open')) drawer.hidden = true; }, 250);
      }
    });

    // Close drawer if a link inside it is clicked
    drawer.addEventListener('click', (e) => {
      if (e.target.tagName.toLowerCase() === 'a') {
        drawer.classList.remove('open');
        document.body.style.overflow = '';
        menuBtn.setAttribute('aria-expanded', 'false');
        setTimeout(() => { if (!drawer.classList.contains('open')) drawer.hidden = true; }, 250);
      }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('open')) {
        drawer.classList.remove('open');
        document.body.style.overflow = '';
        menuBtn.setAttribute('aria-expanded', 'false');
        setTimeout(() => { if (!drawer.classList.contains('open')) drawer.hidden = true; }, 250);
      }
    });
  }

  /* =========================
     GOOGLE SHEETS SUBMISSION
     ========================= */
  // Replace with your own ACTIVE web app deployment URL (must end with /exec)
  const SHEET_ENDPOINT = 'https://script.google.com/macros/s/AKfycbycLExANF-k6ey_L1TfHPdtHzFHjClKg_LijV7XTnxOkK8FlPoY9NcZ6tAoxJAQ7Z1H/exec';

  async function sendToSheet(formEl, formType) {
    const data = new FormData(formEl);
    data.append('formType', formType); // 'booking' or 'employment'

    try {
      const res = await fetch(SHEET_ENDPOINT, {
        method: 'POST',
        body: data
      });
      const text = await res.text();
      let json;
      try { json = JSON.parse(text); } catch { json = null; }

      if (res.ok && json && json.status === 'ok') {
        alert('Thank you — your request was received!');
        formEl.reset();
      } else {
        console.error('Apps Script response:', text);
        alert('There was a problem submitting. Please try again or call us.');
      }
    } catch (err) {
      console.error('Network error:', err);
      alert('Network error — please try again.');
    }
  }

  /* =========================
     FORMS BINDING
     ========================= */
  // Make sure your HTML form tags include these IDs:
  // <form id="bookingForm" class="form"> and <form id="employmentForm" class="form">
  const bookingForm = document.querySelector('#bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      sendToSheet(bookingForm, 'booking');
    });
  }

  const employmentForm = document.querySelector('#employmentForm');
  if (employmentForm) {
    employmentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      sendToSheet(employmentForm, 'employment');
    });
  }
});
