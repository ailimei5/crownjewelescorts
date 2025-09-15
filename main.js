// ===== Mobile drawer toggle =====
const drawer = document.getElementById('drawer');
const menuBtn = document.querySelector('.menu');
if (menuBtn && drawer) {
  menuBtn.addEventListener('click', () => drawer.classList.toggle('open'));
  drawer.addEventListener('click', (e) => {
    if (e.target.tagName.toLowerCase() === 'a') drawer.classList.remove('open');
  });
}

// ===== Google Sheets submission =====
// Replace with your Apps Script Web App URL (ends with /exec)
const SHEET_ENDPOINT = 'https://script.google.com/macros/s/AKfycbylYMzEJHRdSjm7jVDLpwSVb18ySwtNapnOHHyEDR84MzaD5KjjgLXSup20pj8kYGq0Qg/exec';

async function sendToSheet(formEl, formType) {
  const data = new FormData(formEl);
  data.append('formType', formType); // 'booking' or 'employment'

  try {
    const res = await fetch(SHEET_ENDPOINT, { method: 'POST', body: data });
    const json = await res.json().catch(() => ({}));

    if (json.status === 'ok') {
      alert('Thank you — your request was received!');
      formEl.reset();
    } else {
      alert('There was a problem submitting. Please try again or call us.');
    }
  } catch (e) {
    alert('Network error — please try again.');
  }
}

// Hook up Booking form (requires <form id="bookingForm"> … )
const bookingForm = document.querySelector('#bookingForm');
if (bookingForm) {
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    sendToSheet(bookingForm, 'booking');
  });
}

// Hook up Employment form (requires <form id="employmentForm"> … )
const employmentForm = document.querySelector('#employmentForm');
if (employmentForm) {
  employmentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    sendToSheet(employmentForm, 'employment');
  });
}
