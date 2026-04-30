(function() {
  const path = window.location.pathname;
  const isIndex = path.endsWith('index.html') || path.endsWith('/') || path === '';
  const base = isIndex ? '' : 'index.html';

  const nav = document.createElement('nav');
  nav.innerHTML = `
    <a class="logo" href="index.html">
      <div class="logo-mark">
        <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M8 12c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4"/><circle cx="12" cy="12" r="1.5" fill="#fff" stroke="none"/></svg>
      </div>
      <span class="logo-text">Feel<span>Back</span></span>
    </a>
    <ul class="nav-links">
      <li><a href="${base}#vision">Vision</a></li>
      <li><a href="${base}#produit">Produit</a></li>
      <li><a href="${base}#communs">Communs</a></li>
      <li><a href="${base}#rejoindre">Rejoindre</a></li>
    </ul>
    <a href="https://drive.google.com/drive/folders/1YDlfqSPVTVewPGZG9AequrQ0gIMIS3y9?usp=drive_link" target="_blank" class="cta-btn">Demander l'accès au drive</a>
  `;

  // Insère la nav au début du body dès que le script s'exécute
  const script = document.currentScript;
  if (script && script.parentNode) {
    script.parentNode.insertBefore(nav, script);
  } else {
    document.body.insertBefore(nav, document.body.firstChild);
  }
})();
