import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  animationSlide: true,
});

export function buildGallery(images) {
  return images
    .map(
      img => `
        <li class="gallery-item">
            <a href="${img.largeImageURL}">
                <img src="${img.webformatURL}" alt="${img.tags}" loading="lazy"/>
            </a>
            <div class="info">
                <p><b>Likes:</b> ${img.likes}</p>
                <p><b>Views:</b> ${img.views}</p>
                <p><b>Comments:</b> ${img.comments}</p>
                <p><b>Downloads:</b> ${img.downloads}</p>
            </div>
        </li>
    `
    )
    .join('');
}

export function displayGallery(images) {
  const gallery = document.querySelector('.gallery');

  if (!images || images.length === 0) {
    iziToast.warning({
      title: '❌',
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      position: 'topRight',
    });
    return;
  }

  gallery.insertAdjacentHTML('beforeend', buildGallery(images));
  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function smoothScroll() {
  const { height } = gallery.firstElementChild.getBoundingClientRect();
  window.scrollBy({ top: height * 2, behavior: 'smooth' });
}
export const showLoader = () => {
  loader.style.display = 'block';
};
export const hideLoader = () => {
  loader.style.display = 'none';
};
