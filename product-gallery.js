const dialog = document.getElementById('rg-dialog');
const large = document.getElementById('rg-large-image');
const panels = document.querySelectorAll('.rg-layout');
const selectors = document.querySelectorAll('.rg-selector button');
selectors.forEach(button => button.addEventListener('click', () => {
  panels.forEach(panel => panel.hidden = panel.id !== button.dataset.product);
  selectors.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
}));
panels.forEach(panel => {
  const main = panel.querySelector('.rg-main img');
  const thumbs = [...panel.querySelectorAll('.rg-thumb')];
  function selectPhoto(number) {
    const thumb = thumbs.find(item => item.dataset.photo === number);
    if (!thumb) return;
    const photo = thumb.querySelector('img');
    main.src = photo.src;
    main.alt = `${panel.querySelector('h1').textContent} - ${photo.alt}`;
    thumbs.forEach(item => item.setAttribute('aria-pressed', String(item === thumb)));
  }
  function openPhoto() {
    large.src = main.src;
    large.alt = main.alt;
    dialog.showModal();
  }
  thumbs.forEach(button => button.addEventListener('click', () => selectPhoto(button.dataset.photo)));
  panel.querySelectorAll('.rg-details button').forEach(button => button.addEventListener('click', () => { selectPhoto(button.dataset.photo); openPhoto(); }));
  panel.querySelector('.rg-main button').addEventListener('click', openPhoto);
});
document.getElementById('rg-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
