/* shared.js — injects nav + footer into every page */
const NAV_HTML = `
<nav>
  <div class="nav-inner">
    <a href="index.html" class="nav-logo" aria-label="ODSAN Ana Sayfa">
      <span class="nav-logo-wordmark">ODSAN</span>
      <span class="nav-logo-line"></span>
      <span class="nav-logo-sub">Electronics</span>
    </a>
    <ul class="nav-links">
      <li><a href="hakkimizda.html">Hakkımızda</a></li>
      <li><a href="sektorler.html">Sektörler</a></li>
      <li><a href="hizmetler.html">Hizmetler</a></li>
      <li><a href="urunler.html">Ürünler</a></li>
      <li><a href="blog.html">Blog</a></li>
    </ul>
    <a href="index.html#contact" class="nav-cta desk">İletişim</a>
    <button class="nav-toggle" id="navToggle" aria-label="Menü" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </div>
  <div class="nav-mobile" id="navMobile">
    <ul>
      <li><a href="hakkimizda.html" class="nml">Hakkımızda</a></li>
      <li><a href="sektorler.html" class="nml">Sektörler</a></li>
      <li><a href="hizmetler.html" class="nml">Hizmetler</a></li>
      <li><a href="urunler.html" class="nml">Ürünler</a></li>
      <li><a href="blog.html" class="nml">Blog</a></li>
    </ul>
    <a href="index.html#contact" class="nav-cta nml">İletişim</a>
  </div>
</nav>`;

const FOOTER_HTML = `
<footer>
  <div class="footer-inner">
    <div>
      <svg width="120" height="34" viewBox="0 0 120 34">
        <rect x="1" y="1" width="118" height="32" rx="5" fill="#F0EEE8"/>
        <clipPath id="fl1"><rect x="1" y="1" width="118" height="32" rx="5"/></clipPath>
        <rect clip-path="url(#fl1)" x="1" y="26" width="118" height="7" fill="#D85A30"/>
        <text x="60" y="17" font-family="system-ui,sans-serif" font-size="14" font-weight="800" fill="#111214" text-anchor="middle" dominant-baseline="central" letter-spacing="4">ODSAN</text>
      </svg>
    </div>
    <div class="footer-cols">
      <div class="footer-col">
        <div class="footer-col-title">Sayfalar</div>
        <ul>
          <li><a href="hakkimizda.html">Hakkımızda</a></li>
          <li><a href="sektorler.html">Sektörler</a></li>
          <li><a href="hizmetler.html">Hizmetler</a></li>
          <li><a href="urunler.html">Ürünler</a></li>
          <li><a href="blog.html">Blog</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <div class="footer-col-title">Hizmetler</div>
        <ul>
          <li><a href="hizmetler.html">Kart Tamiri</a></li>
          <li><a href="hizmetler.html">PCB Tasarım</a></li>
          <li><a href="hizmetler.html">Sistem Mühendisliği</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <div class="footer-col-title">İletişim</div>
        <ul>
          <li><a href="tel:+903120000000">+90 (312) 000 00 00</a></li>
          <li><a href="mailto:info@odsan.com.tr">info@odsan.com.tr</a></li>
          <li>Ankara / Türkiye</li>
        </ul>
      </div>
    </div>
  </div>
  <div class="footer-bottom">
    <span>© 2024 ODSAN Elektronik San. Tic. A.Ş.</span>
    <span>Where Sparks Become Solutions</span>
  </div>
</footer>`;

document.addEventListener('DOMContentLoaded', () => {
  // Inject nav
  const navEl = document.createElement('div');
  navEl.innerHTML = NAV_HTML;
  document.body.insertBefore(navEl.firstElementChild, document.body.firstChild);

  // Inject footer
  const footerEl = document.createElement('div');
  footerEl.innerHTML = FOOTER_HTML;
  document.body.appendChild(footerEl.firstElementChild);

  // Active nav link
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(a => {
    if (a.getAttribute('href') === current) a.classList.add('active');
  });

  // Nav toggle
  const toggle = document.getElementById('navToggle');
  const mobile = document.getElementById('navMobile');
  if (toggle && mobile) {
    toggle.addEventListener('click', () => {
      const open = mobile.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open);
    });
    document.querySelectorAll('.nml').forEach(l => l.addEventListener('click', () => {
      mobile.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }));
  }

  // Reveal on scroll
  const ro = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); ro.unobserve(e.target); } });
  }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
  document.querySelectorAll('.reveal').forEach(el => ro.observe(el));

  // Counter
  const co = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, tgt = +el.dataset.target, step = Math.ceil(tgt / 80);
      let cur = 0;
      const tmr = setInterval(() => { cur += step; if (cur >= tgt) { el.textContent = tgt; clearInterval(tmr); } else el.textContent = cur; }, 16);
      co.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.counter').forEach(el => co.observe(el));
});
