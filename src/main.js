import { fetchImg } from './js/pixabay-api';
import {
  displayGallery,
  clearGallery,
  showLoader,
  hideLoader,
  smoothScroll,
} from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const searchForm = document.querySelector('.form');
const searchInput = document.querySelector('.form-input');
const loadMoreBtn = document.querySelector('.load-more');

let searchQuery = '';
let currentPage = 1;
let totalHits = 0;
const perPage = 15;

// Обробник події сабміту форми
searchForm.addEventListener('submit', async event => {
  event.preventDefault();

  searchQuery = searchInput.value.trim();
  if (!searchQuery) {
    iziToast.error({
      title: 'Error',
      message: 'Enter a search query',
      position: 'topRight',
    });
    return;
  }

  clearGallery();
  showLoader();
  loadMoreBtn.style.display = 'none';
  currentPage = 1;

  try {
    const { hits, totalHits: total } = await fetchImg(
      searchQuery,
      currentPage,
      perPage
    );
    totalHits = total;
    displayGallery(hits);
    if (hits.length < totalHits) {
      loadMoreBtn.style.display = 'block';
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images. Try again.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});

// Обробник натискання на кнопку "Load More"
loadMoreBtn.addEventListener('click', async () => {
  currentPage++;
  showLoader();
  loadMoreBtn.style.display = 'none';

  try {
    const { hits } = await fetchImg(searchQuery, currentPage, perPage);
    // console.log('Fetched images:', hits);
    displayGallery(hits);
    smoothScroll();

    if (currentPage * perPage >= totalHits) {
      loadMoreBtn.style.display = 'none';
      iziToast.info({
        title: 'End',
        message: "We're sorry, but you've reached the end of search results",
        position: 'topRight',
      });
    } else {
      loadMoreBtn.style.display = 'block';
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch more images.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});
