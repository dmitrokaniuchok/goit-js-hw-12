import axios from 'axios';

const API_KEY = '49266209-5c1ed6293a40b594db6a6f47f';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImg(query, page = 1, per_page = 15) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page,
        per_page,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Помилка отримання зображень:', error.message);
    throw error;
  }
}
