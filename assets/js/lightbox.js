(function () {
  var imgs = Array.prototype.slice.call(document.querySelectorAll('.content img'));
  if (!imgs.length) return;

  var box = document.createElement('div');
  box.className = 'lightbox';
  box.innerHTML =
    '<button class="lb-close" aria-label="Chiudi">&times;</button>' +
    '<button class="lb-prev" aria-label="Precedente">&#8249;</button>' +
    '<img alt="">' +
    '<button class="lb-next" aria-label="Successiva">&#8250;</button>' +
    '<div class="lb-caption"></div>';
  document.body.appendChild(box);

  var big = box.querySelector('img');
  var cap = box.querySelector('.lb-caption');
  var current = 0;

  function show(i) {
    current = (i + imgs.length) % imgs.length;
    var img = imgs[current];
    big.src = img.currentSrc || img.src;
    big.alt = img.alt;
    var fc = img.closest('figure') && img.closest('figure').querySelector('figcaption');
    cap.textContent = fc ? fc.textContent.trim() : '';
    cap.style.display = cap.textContent ? '' : 'none';
  }
  function open(i) { show(i); box.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function close() { box.classList.remove('open'); document.body.style.overflow = ''; }

  imgs.forEach(function (img, i) {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', function () { open(i); });
  });

  box.querySelector('.lb-close').addEventListener('click', close);
  box.querySelector('.lb-prev').addEventListener('click', function (e) { e.stopPropagation(); show(current - 1); });
  box.querySelector('.lb-next').addEventListener('click', function (e) { e.stopPropagation(); show(current + 1); });
  box.addEventListener('click', function (e) { if (e.target === box) close(); });

  document.addEventListener('keydown', function (e) {
    if (!box.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(current - 1);
    else if (e.key === 'ArrowRight') show(current + 1);
  });

  var startX = null;
  box.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
  box.addEventListener('touchend', function (e) {
    if (startX === null) return;
    var dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
    startX = null;
  });
})();
