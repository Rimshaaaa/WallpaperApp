import axios from 'axios';

// Pexels API Key (Replace with your key)
const PEXELS_API_KEY = '8871RwiafJbW7STSTdLlrKk2D10hl7OC1I6vQcku4KwfOhY7yMZtfJYk';

export const fetchWallpapers = async (category: string) => {
  try {
    const response = await axios.get('https://api.pexels.com/v1/search', {
      headers: {
        Authorization: PEXELS_API_KEY,
      },
      params: {
        query: category,
        per_page: 20,
      },
    });
    return response.data.photos;
  } catch (error) {
    console.error('Error fetching wallpapers:', error);
    return [];
  }
};