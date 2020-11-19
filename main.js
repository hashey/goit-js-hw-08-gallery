//======================= IMPORT =================================
import galleryItems from './gallery-items.js';

//======================= REFS =================================
const galleryRef = document.querySelector('ul.js-gallery');
const modalRef = document.querySelector('.js-lightbox');
const modalImageRef = document.querySelector('img.lightbox__image');

//======================= CREATING GALLERY LIST =================================
const createGalleryMarkup = itemsArray =>
  itemsArray.map(obj => {
    const createdItem = document.createElement('li');
    const createdLink = document.createElement('a');
    const createdImage = document.createElement('img');

    createdLink.setAttribute('href', obj.original);
    createdImage.setAttribute('src', obj.preview);
    createdImage.setAttribute('data-source', obj.original);
    createdImage.setAttribute('alt', obj.description);
    createdImage.setAttribute('data-index', obj.index);

    createdItem.classList.add('gallery__item');
    createdLink.classList.add('gallery__link');
    createdImage.classList.add('gallery__image');

    createdLink.appendChild(createdImage);
    createdItem.appendChild(createdLink);

    return createdItem;
  });
galleryRef.append(...createGalleryMarkup(galleryItems));

//======================= EVENT LISTENERS =================================
galleryRef.addEventListener('click', event => {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }

  onOpenModal();
  getOriginalSizeLink(event);
  getIndex(event);
});
modalRef.addEventListener('click', onBackdropAndButtonClick);

//======================= FUNCTIONS =================================
function getOriginalSizeLink(event) {
  const originalImageLink = event.target.getAttribute('data-source');
  modalImageRef.setAttribute('src', originalImageLink);
}

function onBackdropAndButtonClick(event) {
  if (event.target.nodeName !== 'IMG') {
    onCloseModal();
  }
}

function onCloseModal() {
  window.removeEventListener('keydown', onPressEscape);
  window.removeEventListener('keydown', onPressArrow);
  modalRef.classList.remove('is-open');
  modalImageRef.removeAttribute('src');
}

function onOpenModal() {
  window.addEventListener('keydown', onPressEscape);
  window.addEventListener('keydown', onPressArrow);
  modalRef.classList.add('is-open');
}

function onPressEscape(event) {
  if (event.code === 'Escape') {
    onCloseModal();
  }
}

function getIndex(event) {
  const getCurrentIndex = event.target.getAttribute('data-index');
  modalImageRef.setAttribute('data-index', getCurrentIndex);
}

function onPressArrow(event) {
  if (event.code === 'ArrowRight') {
    nextPicture();
  } else if (event.code === 'ArrowLeft') {
    prevPicture();
  }
}

function nextPicture() {
  const curIndex = parseInt(modalImageRef.getAttribute('data-index'));
  if (curIndex === galleryItems.length - 1) {
    return;
  }

  const nextIndex = curIndex + 1;
  const nextImage = galleryItems[nextIndex].original;
  modalImageRef.setAttribute('src', nextImage);
  modalImageRef.setAttribute('data-index', nextIndex);
}

function prevPicture() {
  const curIndex = parseInt(modalImageRef.getAttribute('data-index'));
  if (curIndex === 0) {
    return;
  }
  const prevIndex = curIndex - 1;
  const prevImage = galleryItems[prevIndex].original;
  modalImageRef.setAttribute('src', prevImage);
  modalImageRef.setAttribute('data-index', prevIndex);
}

//======================= END =================================
