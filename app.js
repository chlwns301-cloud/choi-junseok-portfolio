const toggle = document.querySelector('.language-toggle');
const year = document.querySelector('#year');
const progress = document.querySelector('.progress span');
const navLinks = [...document.querySelectorAll('nav a')];

year.textContent = new Date().getFullYear();

function setLanguage(language) {
  document.documentElement.lang = language === 'en' ? 'en' : 'ko';
  document.querySelectorAll('[data-ko][data-en]').forEach((element) => {
    element.innerHTML = element.dataset[language];
  });
  toggle.classList.toggle('en', language === 'en');
  toggle.setAttribute('aria-label', language === 'en' ? 'Change language to Korean' : '언어를 영어로 변경');
}

toggle.addEventListener('click', () => setLanguage(document.documentElement.lang === 'ko' ? 'en' : 'ko'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

function updateScrollState() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${max ? (window.scrollY / max) * 100 : 0}%`;
  const current = navLinks.map((link) => document.querySelector(link.getAttribute('href'))).findLast((section) => section && section.getBoundingClientRect().top <= 130);
  navLinks.forEach((link) => link.classList.toggle('active', current && link.getAttribute('href') === `#${current.id}`));
}
window.addEventListener('scroll', updateScrollState, { passive: true });
updateScrollState();
