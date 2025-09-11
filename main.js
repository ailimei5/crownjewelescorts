// Mobile drawer toggle
const drawer = document.getElementById('drawer');
const menuBtn = document.querySelector('.menu');
if (menuBtn && drawer) {
  menuBtn.addEventListener('click', () => drawer.classList.toggle('open'));
  drawer.addEventListener('click', (e) => {
    if (e.target.tagName.toLowerCase() === 'a') drawer.classList.remove('open');
  });
}
