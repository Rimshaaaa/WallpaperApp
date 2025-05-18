import axios from 'axios';

const API_KEY = '8871RwiafJbW7STSTdLlrKk2D10hl7OC1I6vQcku4KwfOhY7yMZtfJYk'; // Use your Pexels API Key

// Define the type for the wallpaper data
type Wallpaper = {
  id: string;
  src: {
    portrait: string;
    video?: string; // Add video source for video categories
  };
};

// Fetch wallpapers function that differentiates between photo and video fetching
export const fetchWallpapers = async (category: string): Promise<Wallpaper[]> => {
  try {
    if (category === 'Animations') {
      // Fetch videos for the "Animations" category
      const response = await axios.get('https://api.pexels.com/videos/search', {
        headers: {
          Authorization: API_KEY,
        },
        params: {
          query: category,
          per_page: 20, // Adjust as needed
        },
      });

      // Return the first available video link (no resolution filtering)
      return response.data.videos.map((video: any) => {
        const firstAvailableVideo = video.video_files[0]; // Just use the first available video

        return {
          id: video.id,
          src: {
            portrait: firstAvailableVideo.link, // Use the first available video link
            video: firstAvailableVideo.link, // Ensure the video URL is set
          },
        };
      });
    } else {
      // Fetch photos for other categories
      const response = await axios.get('https://api.pexels.com/v1/search', {
        headers: {
          Authorization: API_KEY,
        },
        params: {
          query: category,
          per_page: 40, // Adjust as needed
        },
      });
      return response.data.photos.map((photo: any) => ({
        id: photo.id,
        src: {
          portrait: photo.src.portrait, // Image link
        },
      }));
    }
  } catch (error) {
    console.error('Error fetching wallpapers:', error);
    throw new Error('Failed to fetch wallpapers');
  }
};