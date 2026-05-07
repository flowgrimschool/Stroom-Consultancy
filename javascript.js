// ============================================================
//  hoe gebruik je dit op elke pagina:
//  1. voeg deze lijn toe aan <head> (adjust the path if needed):
//       <script src="/components.js" defer></script>
//  2. verander de <nav>…</nav> block met:
//       <div id="site-nav"></div>
//  3. verander de <footer>…</footer> block met:
//       <div id="site-footer"></div>
// ============================================================

(function () {

/* ── 1. NAV HTML ─────────────────────────────────────────── */
  const NAV_HTML = `
    <nav class="navcontainer">
      <img src="img/Stroom_logo_def-1.jpg" alt="Stroom Consultancy" class="logocontainer">
      <div class="linkcontainer">
        <a class="linkNaarWebsite" href="index.html">Home</a>
        <a class="linkNaarWebsite" href="OverMij.html">Wie ben ik?</a>
      </div>
      <button class="hamburger" aria-label="Menu openen" aria-expanded="false">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>`;
 
  /* ── 2. FOOTER HTML ──────────────────────────────────────── */
   const FOOTER_HTML = `
    <footer class="contactcontainer">
      <div class="footer-inner">
        <div class="footer-merk">
          <p class="footer-tagline">Stroom‑Consultancy</p>
          <p class="footer-ondertitel">Brengt beweging in leiderschap, teams en organisaties.</p>
        </div>
        <div class="footer-contact">
          <p class="footer-vraag">Klaar om in gesprek te gaan?</p>
          <div class="footer-links">
            <a class="footer-link" href="mailto:info@stroom-consultancy.be">
              <span class="footer-link-icon">✉</span>
              <span>info@stroom-consultancy.be</span>
            </a>
          </div>
        </div>
      </div>
      <div class="footer-bodem">
        <p>© Stroom‑Consultancy · Alle rechten voorbehouden</p>
      </div>
    </footer>`;
 
  /* ── 3. INJECT ───────────────────────────────────────────── */
  function inject(id, html) {
    const el = document.getElementById(id);
    if (el) el.outerHTML = html;
  }
 
  function markActiveLink() {
    const path = window.location.pathname;
    document.querySelectorAll('.linkNaarWebsite').forEach(function (link) {
      const href = link.getAttribute('href');
      if (href && path.endsWith(href.replace(/^\//, ''))) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
    // Always mark Home active on root
    if (path === '/' || path === '/index.html') {
      const homeLink = document.querySelector('.linkNaarWebsite[href="/index.html"]');
      if (homeLink) homeLink.classList.add('active');
    }
  }
 
  /* ── 4. HAMBURGER LOGIC ──────────────────────────────────── */
  function initHamburger() {
    const hamburger = document.querySelector('.hamburger');
    const linkContainer = document.querySelector('.linkcontainer');
    if (!hamburger || !linkContainer) return;
 
    hamburger.addEventListener('click', function () {
      const isOpen = linkContainer.classList.toggle('mobile-open');
      hamburger.setAttribute('aria-expanded', isOpen);
      const spans = hamburger.querySelectorAll('span');
      if (isOpen) {
        spans[0].style.transform = 'translateY(9px) rotate(45deg)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'translateY(-9px) rotate(-45deg)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });
 
    linkContainer.querySelectorAll('.linkNaarWebsite').forEach(function (link) {
      link.addEventListener('click', function () {
        linkContainer.classList.remove('mobile-open');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }
 
  /* ── 5. RUN ──────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    inject('site-nav', NAV_HTML);
    inject('site-footer', FOOTER_HTML);
    markActiveLink();
    initHamburger();
  });
 
})();