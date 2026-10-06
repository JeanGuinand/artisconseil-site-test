/* ============================================================
   ARTIS CONSEIL — Interactions front (léger, sans dépendance)
   ============================================================ */
(function () {
  'use strict';

  /* --- Navigation mobile --- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* --- Sous-menus dépliables en mode mobile --- */
  document.querySelectorAll('.header-main__item.has-caret').forEach(function (item) {
    var link = item.querySelector('.header-main__link');
    if (!link) return;
    link.addEventListener('click', function (e) {
      if (window.matchMedia('(max-width: 1000px)').matches) {
        e.preventDefault();
        item.classList.toggle('is-open');
      }
    });
  });

  /* --- FAQ accordéon (accessible) --- */
  document.querySelectorAll('.faq-item__question').forEach(function (btn) {
    btn.setAttribute('aria-expanded', 'false');
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      var open = item.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  /* --- Année dynamique du footer --- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* --- Formulaire de contact : validation + envoi via Formspark ---
     L'envoi se fait en JavaScript (sans rechargement). Sans JavaScript, le
     formulaire est soumis normalement vers l'adresse de l'attribut action. */

  /* --- Autodiagnostic : pré-remplit le message du formulaire de contact --- */
  try {
    var diag = sessionStorage.getItem('artisAutodiag');
    var msgField = document.getElementById('message');
    if (diag && msgField && !msgField.value) {
      msgField.value = diag;
      msgField.rows = 14;
      sessionStorage.removeItem('artisAutodiag');
    }
  } catch (err) {}

  document.querySelectorAll('form[data-contact]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = form.querySelector('[data-form-msg]');
      var btn = form.querySelector('[type="submit"]');
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      if (btn && btn.disabled) return;
      if (btn) btn.disabled = true;
      var data = {};
      new FormData(form).forEach(function (value, key) { data[key] = value; });
      var show = function (text, ok) {
        if (!msg) return;
        msg.hidden = false;
        msg.textContent = text;
        msg.style.color = ok ? 'var(--color-success-txt)' : 'var(--color-error-txt)';
        msg.style.borderLeftColor = msg.style.color;
        msg.style.background = ok ? 'rgba(110,231,160,.12)' : 'rgba(252,165,165,.12)';
        if (msg.scrollIntoView) msg.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      };
      fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      }).then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        form.reset();
        show('Merci. Votre demande a bien été transmise à ARTIS CONSEIL. Nous reviendrons vers vous rapidement.', true);
      }).catch(function () {
        show("Une erreur est survenue lors de l'envoi. Vous pouvez également nous écrire à contact@artisconseil.com.", false);
      }).then(function () {
        if (btn) btn.disabled = false;
      });
    });
  });
})();
