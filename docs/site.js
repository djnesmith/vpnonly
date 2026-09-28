// Shared by every page. Phones only: a slim buy bar that slides up once the
// page's first buy button (or, on pages without one, the nav) has scrolled
// away, and gets out of the way again near the page's own closing button and
// the footer, so it never covers either.
(() => {
  const bar = document.querySelector(".buybar");
  if (!bar || !("IntersectionObserver" in window)) return;
  const phone = matchMedia("(max-width: 759px)");
  const start = document.querySelector(".hero .btn") || document.querySelector(".nav");
  const ends = document.querySelectorAll("#buy, .solo .cta, .foot");
  const near = new Set();
  let past = false;
  const update = () => bar.classList.toggle("show", phone.matches && past && near.size === 0);
  new IntersectionObserver(([e]) => {
    past = !e.isIntersecting && e.boundingClientRect.top < 0;
    update();
  }).observe(start);
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => (e.isIntersecting ? near.add(e.target) : near.delete(e.target)));
    update();
  });
  ends.forEach(el => io.observe(el));
  if (phone.addEventListener) phone.addEventListener("change", update);
  bar.hidden = false;
})();
