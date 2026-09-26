(function () {
  const currentScript = document.currentScript;
  const siteRoot = new URL('./', currentScript.src);
  const siteUrl = (path) => new URL(path, siteRoot).href;
  const body = document.body;
  if (!body || body.dataset.econovaShell === 'ready') return;
  body.dataset.econovaShell = 'ready';

  const fontLink = document.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Outfit:wght@600;800;900&family=Quicksand:wght@600;700&display=swap';
  document.head.appendChild(fontLink);

  let skip = document.querySelector('a.skip');
  if (skip) {
    skip.classList.add('econova-site-skip');
  } else {
    skip = document.createElement('a');
    skip.className = 'econova-site-skip';
    skip.href = '#econova-content';
    skip.textContent = 'Skip to content';
    body.prepend(skip);
  }

  const main = document.querySelector('main');
  if (main && !main.id) main.id = 'econova-content';

  const legacyHeaders = Array.from(document.querySelectorAll('header'));
  legacyHeaders.forEach((header) => {
    header.classList.add('econova-context-header');
    const labels = Array.from(header.querySelectorAll('a')).map((link) =>
      link.textContent.replace(/\s+/g, ' ').trim().toLowerCase()
    );
    const genericHomeNav = labels.includes('our classes') && labels.includes('explore & learn') &&
      labels.includes('services') && labels.every((label) =>
        ['our classes', 'explore & learn', 'services', 'let’s learn ↗', "let's learn ↗"].includes(label)
      );
    if (genericHomeNav) header.classList.add('econova-context-header--hidden');
  });

  const header = document.createElement('header');
  header.className = 'econova-site-header';
  header.innerHTML = `
    <div class="econova-site-header__inner">
      <a class="econova-site-brand" href="${siteUrl('index.html')}" aria-label="Econova home">
        <span class="econova-site-brand__mark" aria-hidden="true">✦</span>
        <span>Econova<em>.vip</em></span>
      </a>
      <nav class="econova-site-nav" aria-label="Main navigation">
        <a href="${siteUrl('index.html#classes')}">Our classes</a>
        <a href="${siteUrl('index.html#explore')}">Explore &amp; learn</a>
        <a href="${siteUrl('index.html#services')}">Services</a>
        <a class="econova-site-nav__cta" href="${siteUrl('class-1/index.html')}">Let’s learn <span aria-hidden="true">↗</span></a>
      </nav>
    </div>`;

  const firstLegacyHeader = legacyHeaders[0];
  if (firstLegacyHeader && firstLegacyHeader.parentElement === body) {
    body.insertBefore(header, firstLegacyHeader);
  } else if (skip && skip.parentElement === body) {
    skip.after(header);
  } else {
    body.prepend(header);
  }

  if (skip) {
    const contentTarget = main || Array.from(body.children).find((element) =>
      element !== skip && element !== header && !element.matches('script,style,footer,header')
    );
    if (contentTarget) {
      if (!contentTarget.id) contentTarget.id = 'econova-content';
      skip.href = `#${contentTarget.id}`;
    }
  }

  document.querySelectorAll('footer, .footer').forEach((footer) => {
    footer.classList.add('econova-legacy-footer');
    footer.setAttribute('aria-hidden', 'true');
  });

  const footer = document.createElement('footer');
  footer.className = 'econova-site-footer';
  footer.innerHTML = `
    <div class="econova-site-footer__inner">
      <a class="econova-site-footer__brand" href="${siteUrl('index.html')}">Econova.vip ✦</a>
      <p class="econova-site-footer__copy">© ${new Date().getFullYear()} Econova.vip · Made for little minds with big ideas.</p>
      <nav class="econova-site-footer__links" aria-label="Footer navigation">
        <a href="${siteUrl('index.html#classes')}">Classes</a>
        <a href="${siteUrl('index.html#explore')}">Explore</a>
        <a href="${siteUrl('index.html#services')}">Services</a>
        <a href="mailto:econovavip@gmail.com">Contact</a>
        <a href="#top" class="econova-back-to-top">Back to top ↑</a>
      </nav>
    </div>`;
  footer.id = 'top';
  body.appendChild(footer);
  const topLink = footer.querySelector('.econova-back-to-top');
  topLink.href = '#econova-page-top';
  const pageTop = document.createElement('span');
  pageTop.id = 'econova-page-top';
  pageTop.setAttribute('aria-hidden', 'true');
  body.insertBefore(pageTop, body.firstChild);
})();
