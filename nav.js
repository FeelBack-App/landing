(function() {
  const path = window.location.pathname;
  const isIndex = path.endsWith('index.html') || path.endsWith('/') || path === '';
  const base = isIndex ? '' : 'index.html';

  // Inject all navbar styles
  const style = document.createElement('style');
  style.textContent = `
    :root {
      --b50:#E6F1FB;--b100:#B5D4F4;--b200:#85B7EB;--b400:#378ADD;--b600:#185FA5;--b800:#0C447C;--b900:#042C53;
      --color-background-primary:#ffffff;
      --color-background-secondary:#f5f7fa;
      --color-text-primary:#042C53;
      --color-text-secondary:#5a6a80;
      --color-border-tertiary:#e2e8f0;
      --border-radius-md:8px;
      --border-radius-lg:14px;
      --font-sans:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;
    }
    nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.1rem 2.5rem;
      border-bottom: 0.5px solid var(--color-border-tertiary);
      background: var(--color-background-primary);
      position: sticky;
      top: 0;
      z-index: 100;
      font-family: var(--font-sans);
    }
    .logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
    .logo-mark { width: 34px; height: 34px; border-radius: 9px; background: var(--b800); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .logo-mark svg { width: 20px; height: 20px; stroke: #fff; fill: none; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
    .logo-text { font-size: 17px; font-weight: 500; color: var(--b900); letter-spacing: -0.3px; }
    .logo-text span { color: var(--b400); }
    .nav-links { display: flex; gap: 2rem; list-style: none; margin: 0; padding: 0; }
    .nav-links a { font-size: 14px; color: var(--color-text-secondary); text-decoration: none; transition: color 0.2s; }
    .nav-links a:hover { color: var(--b600); }
    nav .cta-btn { background: var(--b600); color: #fff; border: none; border-radius: var(--border-radius-md); padding: 9px 20px; font-size: 14px; cursor: pointer; font-weight: 500; transition: background 0.2s; text-decoration: none; display: inline-block; white-space: nowrap; }
    nav .cta-btn:hover { background: var(--b800); }
    /* All nav items consistent */
    .nav-links li { position: relative; }
    .nav-links li > a { display: flex; align-items: center; gap: 4px; }
    .nav-links li > a::after { content: ''; display: inline-block; width: 5px; height: 5px; border-right: 1.5px solid currentColor; border-bottom: 1.5px solid currentColor; transform: rotate(45deg) translateY(-2px); opacity: 0.4; transition: transform 0.2s; }
    .nav-links li.nav-item:hover > a::after { transform: rotate(-135deg) translateY(-2px); opacity: 0.7; }
    /* Dropdown — padding-top crée le pont invisible pour éviter la zone morte */
    .dropdown {
      display: none;
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      background: var(--color-background-primary);
      border: 0.5px solid var(--color-border-tertiary);
      border-radius: var(--border-radius-lg);
      box-shadow: 0 8px 24px rgba(4,44,83,0.10);
      min-width: 220px;
      padding: 6px;
      padding-top: 16px;
      z-index: 200;
    }
    .dropdown::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 10px;
    }
    .nav-item:hover .dropdown { display: block; }
    .dropdown a {
      display: block;
      padding: 9px 14px;
      font-size: 13px;
      color: var(--color-text-secondary) !important;
      text-decoration: none;
      border-radius: 8px;
      transition: background 0.15s, color 0.15s;
      white-space: nowrap;
    }
    .dropdown a:hover { background: var(--b50); color: var(--b800) !important; }
    .dropdown .drop-label { font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 1.4px; color: var(--b400) !important; padding: 8px 14px 4px; cursor: default; }
    .dropdown .drop-label:hover { background: none; }
    .dropdown .drop-sep { border: none; border-top: 0.5px solid var(--color-border-tertiary); margin: 4px 0; }
    /* Hamburger */
    .nav-burger { display: none; flex-direction: column; gap: 5px; cursor: pointer; padding: 4px; background: none; border: none; }
    .nav-burger span { display: block; width: 22px; height: 2px; background: var(--b900); border-radius: 2px; transition: transform 0.25s, opacity 0.25s; }
    .nav-burger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
    .nav-burger.open span:nth-child(2) { opacity: 0; }
    .nav-burger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
    /* Mobile menu */
    .nav-mobile {
      display: none;
      position: absolute;
      top: 100%;
      left: 0; right: 0;
      background: var(--color-background-primary);
      border-bottom: 0.5px solid var(--color-border-tertiary);
      box-shadow: 0 8px 24px rgba(4,44,83,0.08);
      padding: 0.75rem 1.25rem 1.25rem;
      z-index: 99;
    }
    .nav-mobile.open { display: block; }
    .nav-mobile a {
      display: block;
      padding: 10px 4px;
      font-size: 15px;
      color: var(--color-text-primary);
      text-decoration: none;
      border-bottom: 0.5px solid var(--color-border-tertiary);
    }
    .nav-mobile a:last-child { border-bottom: none; }
    .nav-mobile a:hover { color: var(--b600); }
    .nav-mobile .mob-group-label { font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 1.4px; color: var(--b400); padding: 14px 4px 4px; }
    .nav-mobile .mob-sub { font-size: 13px; color: var(--color-text-secondary); padding-left: 12px; }
    .nav-mobile .mob-cta { margin-top: 1rem; display: block; text-align: center; background: var(--b600); color: #fff !important; border-radius: var(--border-radius-md); padding: 11px; font-weight: 500; font-size: 14px; border-bottom: none !important; }
    .nav-mobile .mob-cta:hover { background: var(--b800); }
    @media(max-width:768px) {
      nav { padding: 1rem 1.25rem; gap: 0; position: relative; justify-content: space-between; }
      .nav-links { display: none !important; }
      nav > .cta-btn { display: none !important; }
      .nav-burger { display: flex; }
      section { padding: 3rem 1.25rem !important; }
      .container { padding: 0; }
      h1 { font-size: 30px !important; letter-spacing: -0.4px; }
      h2 { font-size: 24px !important; }
      .hero-sub { font-size: 15px; }
      .feat-list { grid-template-columns: 1fr !important; }
      .vision-grid { grid-template-columns: 1fr !important; }
      .hero-divider { flex-wrap: wrap; gap: 0.6rem; }
      footer { flex-direction: column; align-items: flex-start; padding: 1.5rem 1.25rem; }
      .footer-links { flex-wrap: wrap; gap: 1rem; }
    }
    @media(max-width:480px) {
      h1 { font-size: 25px !important; }
      h2 { font-size: 21px !important; }
      .communs-section { border-radius: 0; }
    }
  `;
  document.head.appendChild(style);

  const nav = document.createElement('nav');
  nav.innerHTML = `
    <a class="logo" href="index.html">
      <div class="logo-mark">
        <img src="logo.svg" width="20" height="20" alt="FeelBack logo">
      </div>
      <span class="logo-text">Feel<span>Back</span></span>
    </a>
    <ul class="nav-links">
      <li class="nav-item"><a href="${base}#vision">Vision</a></li>
      <li class="nav-item">
        <a href="${base}#produit">Produit</a>
        <div class="dropdown">
          <span class="drop-label">Nos solutions</span>
          <hr class="drop-sep">
          <a href="${base}#produit">Vue d'ensemble</a>
          <a href="produit-individuel.html">Santé mentale individuelle</a>
          <a href="produit-collectif.html">Santé mentale collective</a>
        </div>
      </li>
      <li class="nav-item">
        <a href="${base}#communs">Communs</a>
        <div class="dropdown">
          <span class="drop-label">Les communs</span>
          <hr class="drop-sep">
          <a href="${base}#communs">Vue d'ensemble</a>
          <a href="modele-economique.html">Modèle économique</a>
          <a href="modele-decisionnel.html">Modèle décisionnel</a>
        </div>
      </li>
      <li class="nav-item">
        <a href="${base}#rejoindre">Rejoindre</a>
        <div class="dropdown">
          <span class="drop-label">Vous êtes…</span>
          <hr class="drop-sep">
          <a href="${base}#rejoindre">Vue d'ensemble</a>
          <a href="rejoindre.html">Comme collaborateur</a>
          <a href="partenaire.html">Comme partenaire</a>
        </div>
      </li>
    </ul>
    <a href="https://drive.google.com/drive/folders/1YDlfqSPVTVewPGZG9AequrQ0gIMIS3y9?usp=drive_link" target="_blank" class="cta-btn">Demander l'accès au drive</a>
    <button class="nav-burger" aria-label="Menu" id="navBurger">
      <span></span><span></span><span></span>
    </button>
    <div class="nav-mobile" id="navMobile">
      <span class="mob-group-label">Navigation</span>
      <a href="${base}#vision">Vision</a>
      <span class="mob-group-label">Communs</span>
      <a href="${base}#communs" class="mob-sub">Vue d'ensemble</a>
      <a href="modele-economique.html" class="mob-sub">Modèle économique</a>
      <a href="modele-decisionnel.html" class="mob-sub">Modèle décisionnel</a>
      <span class="mob-group-label">Produit</span>
      <a href="produit-individuel.html" class="mob-sub">Santé mentale individuelle</a>
      <a href="produit-collectif.html" class="mob-sub">Santé mentale collective</a>
      <span class="mob-group-label">Rejoindre</span>
      <a href="rejoindre.html" class="mob-sub">Comme collaborateur</a>
      <a href="partenaire.html" class="mob-sub">Comme partenaire</a>
      <a href="https://drive.google.com/drive/folders/1YDlfqSPVTVewPGZG9AequrQ0gIMIS3y9?usp=drive_link" target="_blank" class="mob-cta">Demander l'accès au drive</a>
    </div>
  `;

  const script = document.currentScript;
  if (script && script.parentNode) {
    script.parentNode.insertBefore(nav, script);
  } else {
    document.body.insertBefore(nav, document.body.firstChild);
  }

  document.getElementById('navBurger').addEventListener('click', function() {
    this.classList.toggle('open');
    document.getElementById('navMobile').classList.toggle('open');
  });

  // Fermer le menu au clic sur un lien
  document.getElementById('navMobile').querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      document.getElementById('navBurger').classList.remove('open');
      document.getElementById('navMobile').classList.remove('open');
    });
  });
})();
