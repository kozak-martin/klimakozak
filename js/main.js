/* Radoslav Kozák – mobilné menu a aktuálny rok v pätičke. Žiadne sledovanie, žiadne cookies. */
(function () {
  'use strict';

  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('menu');

  if (toggle && nav) {
    var setOpen = function (open) {
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      nav.classList.toggle('is-open', open);
    };

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    // Po kliknutí na odkaz menu zavrieť
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });

    // Escape zavrie menu a vráti fokus na tlačidlo
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });

    // Klik mimo menu ho zavrie
    document.addEventListener('click', function (e) {
      if (toggle.getAttribute('aria-expanded') === 'true' &&
          !nav.contains(e.target) && !toggle.contains(e.target)) {
        setOpen(false);
      }
    });

    // Pri prechode na desktopové rozloženie stav resetovať
    var mq = window.matchMedia('(min-width: 960px)');
    var onChange = function () { if (mq.matches) setOpen(false); };
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else if (mq.addListener) mq.addListener(onChange);
  }

  var year = String(new Date().getFullYear());
  var els = document.querySelectorAll('[data-rok]');
  for (var i = 0; i < els.length; i++) els[i].textContent = year;
})();
