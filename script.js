const menuButton = document.querySelector('.menu');
const nav = document.querySelector('.topbar nav');

menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

const bookingForm = document.getElementById('booking-form');
const bookingStatus = document.getElementById('booking-status');
const bookingFallback = document.getElementById('booking-whatsapp-fallback');

bookingForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const details = new FormData(bookingForm);
  const message = `Hi Dublin 15 Door2Airport, I'd like a taxi quote.\n\nName: ${details.get('name')}\nPhone: ${details.get('phone')}\nPickup: ${details.get('pickup')}\nDrop off: ${details.get('destination')}\nDate: ${details.get('date')}\nTime: ${details.get('time')}\nPassengers: ${details.get('passengers')}`;
  const whatsappUrl = `https://wa.me/353858122981?text=${encodeURIComponent(message)}`;
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const isHomeScreenApp = navigator.standalone === true || window.matchMedia('(display-mode: standalone)').matches;

  bookingFallback.href = whatsappUrl;
  bookingStatus.hidden = false;

  // A direct same-window navigation reliably hands the message to WhatsApp on
  // iPhone, including when the website was saved to the Home Screen.
  if (isMobile || isHomeScreenApp) {
    window.location.assign(whatsappUrl);
    return;
  }

  const whatsappWindow = window.open(whatsappUrl, '_blank');
  if (whatsappWindow) {
    whatsappWindow.opener = null;
  } else {
    window.location.assign(whatsappUrl);
  }
});

document.getElementById('year').textContent = new Date().getFullYear();

let installPrompt;
const installButton = document.getElementById('install-app');
const installHelp = document.getElementById('install-help');
const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
const isStandalone = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;

if (isStandalone) {
  installButton.textContent = 'App installed';
  installButton.disabled = true;
}

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  installPrompt = event;
  installButton.classList.add('ready');
});

installButton.addEventListener('click', async () => {
  if (installPrompt) {
    installPrompt.prompt();
    const result = await installPrompt.userChoice;
    if (result.outcome === 'accepted') {
      installButton.textContent = 'App installed';
      installButton.disabled = true;
    }
    installPrompt = null;
  } else {
    installHelp.innerHTML = isIOS
      ? 'In <strong>Safari</strong>, tap the <strong>Share</strong> button, then choose <strong>Add to Home Screen</strong> and tap <strong>Add</strong>.'
      : 'In <strong>Chrome</strong>, tap the <strong>⋮</strong> menu and choose <strong>Install app</strong> or <strong>Add to Home screen</strong>.';
    installHelp.hidden = false;
  }
});

window.addEventListener('appinstalled', () => {
  installButton.textContent = 'App installed';
  installButton.disabled = true;
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    const registration = await navigator.serviceWorker.register('/service-worker.js', { updateViaCache: 'none' });
    registration.update();
  });
}
