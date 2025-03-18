import { fetchImg } from './js/pixabay-api';
import { displayGallery, clearGallery } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const searchForm = document.querySelector('.form');
const searchInput = document.querySelector('.form-input');
const loader = document.querySelector('.loader');

searchForm.addEventListener('submit', async event => {
  event.preventDefault();

  const query = searchInput.value.trim();
  if (!query) {
    iziToast.error({
      title: 'Error',
      message: 'Enter a search query',
      position: 'topRight',
    });
    return;
  }

  clearGallery();
  loader.style.display = 'block';

  try {
    const images = await fetchImg(query);
    if (!images || images.length === 0) {
      iziToast.warning({
        title: 'No Results',
        message: 'No images found',
        position: 'topRight',
      });
      return;
    }
    displayGallery(images);
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images. Try again.',
      position: 'topRight',
    });
  } finally {
    setTimeout(() => {
      loader.style.display = 'none';
    }, 500);
  }
});
