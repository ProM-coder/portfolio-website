const themeToggle = document.getElementById('themeToggle');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const assistantToggle = document.getElementById('assistantToggle');
const assistantPanel = document.getElementById('assistantPanel');
const assistantClose = document.getElementById('assistantClose');
const projectForm = document.getElementById('projectRequestForm');
const formStatus = document.getElementById('formStatus');

function loadTheme(){
  const savedTheme = localStorage.getItem('portfolio-theme');
  if(savedTheme === 'light'){
    document.documentElement.classList.add('light-mode');
    themeToggle.textContent = '☀️';
  }
}

loadTheme();

themeToggle?.addEventListener('click', () => {
  document.documentElement.classList.toggle('light-mode');
  const isLight = document.documentElement.classList.contains('light-mode');
  localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
  themeToggle.textContent = isLight ? '☀️' : '🌙';
});

menuToggle?.addEventListener('click', () => navMenu.classList.toggle('open'));
navMenu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => navMenu.classList.remove('open')));

assistantToggle?.addEventListener('click', () => assistantPanel.classList.toggle('open'));
assistantClose?.addEventListener('click', () => assistantPanel.classList.remove('open'));

const revealItems = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealItems.forEach(item => observer.observe(item));

/* EMAILJS SETUP - Connected and configured */
const EMAILJS_PUBLIC_KEY = 'hEhdSSHr1Zq48T4yf';
const EMAILJS_SERVICE_ID = 'service_fp9axxm';
const EMAILJS_TEMPLATE_ID = 'template_igcosms';

if(window.emailjs){
  emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
}

projectForm?.addEventListener('submit', function(event){
  event.preventDefault();

  if(!window.emailjs){
    formStatus.textContent = 'Email service is not available. Please try again later.';
    return;
  }

  formStatus.textContent = 'Sending your request...';

  emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, this)
    .then(() => {
      formStatus.textContent = 'Thank you. Your project request has been sent successfully.';
      projectForm.reset();
    })
    .catch((error) => {
      console.error('EmailJS error:', error);
      formStatus.textContent = 'Something went wrong. Please try again or email me directly.';
    });
});
