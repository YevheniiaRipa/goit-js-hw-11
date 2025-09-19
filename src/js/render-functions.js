import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionSelector: 'img',
  captionType: 'attr',
  captionsData: 'alt',
});

export function createGallery(images) {
  const gallery = document.querySelector('.gallery');

  const galleryHTML = images
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
    <li class="gallery-item">
      <a href="${largeImageURL}">
        <img
          src="${webformatURL}"
          alt="${tags}"
          class="gallery-image"
        />
        <div class="image-info">
          <p><span>Likes:</span> ${likes}</p>
          <p><span>Views:</span> ${views}</p>
          <p><span>Comments:</span> ${comments}</p>
          <p><span>Downloads:</span> ${downloads}</p>
        </div>
      </a>
    </li>
  `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', galleryHTML);
  lightbox.refresh();
}

export function clearGallery() {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';
}

export function showLoader() {
  const loaderContainer = document.querySelector('.loader-container');
  loaderContainer.classList.add('visible');
}

export function hideLoader() {
  const loaderContainer = document.querySelector('.loader-container');
  loaderContainer.classList.remove('visible');
}
