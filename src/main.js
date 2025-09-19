import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import crossIcon from '/img/cross.svg';

const form = document.querySelector('.form');
const searchInput = document.querySelector('input[name="search-text"]');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const query = searchInput.value.trim();

  if (!query) {
    iziToast.error({
      title: 'Error',
      titleColor: '#ffffff',
      message: 'Please enter a search term',
      iconUrl: crossIcon,
      messageColor: '#ffffff',
      backgroundColor: '#ef4040',
      position: 'topRight',
      timeout: 4000,
      animateInside: true,
      progressBar: false,
      close: false,
      closeOnClick: true,
    });
    return;
  }

  clearGallery();
  showLoader();

  getImagesByQuery(query)
    .then(response => {
      const images = response.hits;

      if (!images.length) {
        iziToast.info({
          message:
            'Sorry, there are no images matching <br>your search query. Please try again!',
          iconUrl: crossIcon,
          messageColor: '#ffffff',
          backgroundColor: '#ef4040',
          position: 'topRight',
          timeout: 4000,
          animateInside: true,
          progressBar: false,
          close: false,
          closeOnClick: true,
        });
        return;
      }

      createGallery(images);
    })
    .catch(error => {
      hideLoader();
      iziToast.error({
        title: 'Error',
        titleColor: '#ffffff',
        message: `Failed to fetch images. <u>${error.message}</u>. Please try again.`,
        iconUrl: crossIcon,
        messageColor: '#ffffff',
        backgroundColor: '#ef4040',
        position: 'topRight',
        timeout: 4000,
        animateInside: true,
        progressBar: false,
        close: false,
        closeOnClick: true,
      });
    })
    .finally(() => {
      hideLoader();
    });

  event.target.reset();
}
