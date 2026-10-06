/* ============================================================
   ARTIS CONSEIL - Autodiagnostic IA (page d'accueil)
   Le visiteur coche les situations qu'il reconnaît (A2) et les
   risques Shadow AI (A3). Avant tout envoi, un récapitulatif
   modifiable lui est présenté. Rien n'est transmis sans son clic.
   ============================================================ */
(function () {
  'use strict';
  var EMAIL = 'contact@artisconseil.com';
  var KEY = 'artisAutodiag';
  var bar = document.getElementById('diagBar');
  var modal = document.getElementById('diagModal');
  if (!bar || !modal) return;
  var txt = document.getElementById('diagText');
  var pendingHref = 'contact.html';

  /* Boutons A2 (la bascule A3 est gérée par le script de la section) */
  document.querySelectorAll('.a2__check').forEach(function (b) {
    b.addEventListener('click', function () {
      var on = b.getAttribute('aria-pressed') !== 'true';
      b.setAttribute('aria-pressed', on);
      b.closest('.a2__row').classList.toggle('is-on', on);
    });
  });

  function selected(kind) {
    return Array.prototype.slice.call(
      document.querySelectorAll('[data-diag="' + kind + '"][aria-pressed="true"]'));
  }
  function total() { return document.querySelectorAll('[data-diag][aria-pressed="true"]').length; }

  function refresh() {
    bar.hidden = total() === 0;
  }
  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-diag]')) setTimeout(refresh, 0);
  });

  function buildMessage() {
    var p = selected('p1').concat(selected('p2')), r = selected('risk');
    var L = ['Bonjour,', '', 'Suite à mon autodiagnostic sur le site Artis Conseil :', ''];
    if (p.length) {
      L.push('Pistes de projets IA identifiées :');
      p.forEach(function (b) { L.push('- ' + b.dataset.label); });
      L.push('');
    }
    L.push(p.length ? 'Autres pistes de projets :' : 'Pistes de projets IA :', '- ', '- ', '');
    if (r.length) {
      L.push('Je souhaiterais que l\'on sensibilise mes collaborateurs aux risques de l\'IA pour mon entreprise.', '');
    }
    L.push('Je souhaiterais échanger avec vous sur ces sujets.', '', 'Nom :', 'Entreprise :', 'Fonction :', 'Téléphone :');
    return L.join('\n');
  }

  function open(href) {
    pendingHref = href || 'contact.html';
    txt.value = buildMessage();
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    txt.focus();
  }
  function close() { modal.hidden = true; document.body.style.overflow = ''; }

  document.getElementById('diagOpen').addEventListener('click', function () { open(); });
  document.getElementById('diagClose').addEventListener('click', close);
  modal.addEventListener('click', function (e) { if (e.target === modal) close(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !modal.hidden) close(); });

  /* Les boutons d'appel à l'action ouvrent le récapitulatif si des éléments sont cochés */
  document.querySelectorAll('[data-diag-cta]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      if (total() > 0) { e.preventDefault(); open(a.getAttribute('href')); }
    });
  });

  document.getElementById('diagMail').addEventListener('click', function () {
    window.location.href = 'mailto:' + EMAIL + '?subject=' +
      encodeURIComponent('Autodiagnostic IA · site Artis Conseil') + '&body=' + encodeURIComponent(txt.value);
  });
  document.getElementById('diagForm').addEventListener('click', function () {
    try { sessionStorage.setItem(KEY, txt.value); } catch (err) {}
    var sep = pendingHref.indexOf('?') > -1 ? '&' : '?';
    window.location.href = pendingHref + sep + 'autodiag=1';
  });
})();
