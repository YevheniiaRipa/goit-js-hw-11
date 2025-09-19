import axios from 'axios';

const API_KEY = '52357534-32b775e5278862406bf3d127c';
const BASE_URL = 'https://pixabay.com/api/';

export function getImagesByQuery(query) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };

  return axios
    .get(BASE_URL, { params })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw error;
    });
}
