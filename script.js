/**
 * WhatsApp comercial e identidade consultados no site oficial da Monks.
 * Número com DDI 55 + DDD 47 + telefone, sem pontuação.
 */
const WHATSAPP_NUMBER = "5547933868451";

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

function closeMenu() {
  nav.classList.remove('is-open');
  menuButton.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');
}

menuButton.addEventListener('click', () => {
  const isOpen = !nav.classList.contains('is-open');
  nav.classList.toggle('is-open', isOpen);
  menuButton.classList.toggle('is-open', isOpen);
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
});

nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeMenu();
});
document.addEventListener('click', event => {
  if (!nav.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
});

const messages = {
  orcamento: 'Olá! Conheci o novo site da Monks Tecnologia & Sistemas e gostaria de conversar sobre um projeto para minha empresa.',
  site: 'Olá! Vi o site da Monks e quero saber mais sobre a criação de um site profissional.',
  sistema: 'Olá! Vi os sistemas da Monks e gostaria de conversar sobre um sistema para minha empresa.',
  google: 'Olá! Quero melhorar o Perfil da minha empresa no Google e gostaria de saber como a Monks pode ajudar.',
  suporte: 'Olá! Preciso de suporte técnico para computador ou notebook.'
};

document.querySelectorAll('.contact-link').forEach(link => {
  const message = messages[link.dataset.contact] || messages.orcamento;
  link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
});

document.getElementById('year').textContent = new Date().getFullYear();

// Não ocultamos conteúdo do usuário quando não há IntersectionObserver.
// Desta forma a página continua acessível mesmo com JS limitado.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if ('IntersectionObserver' in window && !reducedMotion) {
  const sections = document.querySelectorAll('.service-card, .project-card, .value-list > div, .process-step');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('seen');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: 0.08});
  sections.forEach(el => {
    el.classList.add('entrance');
    observer.observe(el);
  });
}

// No celular, o WhatsApp flutuante nao cobre o conteudo do bloco de contato.
// O bloco ja oferece dois links diretos para conversar com a Monks.
const contactArea = document.querySelector('#contato');
if (contactArea && 'IntersectionObserver' in window) {
  const contactVisibility = new IntersectionObserver(entries => {
    document.body.classList.toggle('contact-visible', entries[0].isIntersecting);
  }, { threshold: 0.02 });
  contactVisibility.observe(contactArea);
}
