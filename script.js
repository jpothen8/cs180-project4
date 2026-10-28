const modal = document.querySelector('dialog');
const enlarged = modal.querySelector('img');
const caption = modal.querySelector('p');

document.querySelectorAll('.image-link').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    enlarged.src = link.href;
    enlarged.alt = link.querySelector('img').alt;
    caption.textContent = link.closest('figure').querySelector('figcaption').textContent;
    modal.showModal();
  });
});
modal.querySelector('button').addEventListener('click', () => modal.close());
modal.addEventListener('click', event => {
  if (event.target === modal) {
    const box = modal.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) modal.close();
  }
});

const navLinks = [...document.querySelectorAll('nav a')];
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.setAttribute('aria-current', String(link.hash === '#' + entry.target.id)));
    }
  });
}, { rootMargin:'-15% 0px -65% 0px' });
document.querySelectorAll('main section').forEach(section => observer.observe(section));

let closedDetails = [];
function preparePrint() {
  closedDetails = [...document.querySelectorAll('details:not([open])')];
  closedDetails.forEach(details => { details.open = true; });
}
window.addEventListener('beforeprint', preparePrint);
window.addEventListener('afterprint', () => {
  closedDetails.forEach(details => { details.open = false; });
});
document.querySelector('.print-button').addEventListener('click', async () => {
  await Promise.all([...document.querySelectorAll('main img, .hero img')].map(img => img.decode()));
  window.print();
});
