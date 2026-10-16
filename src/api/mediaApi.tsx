import axios from "axios";

const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_KEY;
const TENOR_KEY = import.meta.env.VITE_TENOR_KEY;

interface UnsplashPhoto {
  id: string;
  urls: { small?: string };
  alt_description: string | null;
  description: string | null;
  links: { html?: string };
}

interface UnsplashSearchResponse {
  results: UnsplashPhoto[];
  total_pages: number;
}

interface GiphyResult {
  id: string;
  title: string;
  images?: { fixed_width?: { url?: string } };
}

interface GiphySearchResponse {
  data: GiphyResult[];
  pagination: { total_count: number };
}

export const fetchPhotos = async (
  query: string,
  perPage: number,
  page: number,
) => {
  const response = await axios.get<UnsplashSearchResponse>('https://api.unsplash.com/search/photos', {
    params: {
      client_id: UNSPLASH_KEY,
      query,
      per_page: perPage,
      page,
    },
  });

  console.log(response.data);
  return response.data;
};

export const fetchGIF= async (
  query: string,
  perPage: number,
  page: number,
) => {
  const response = await axios.get<GiphySearchResponse>('https://api.giphy.com/v1/gifs/search', {
    params: {
      api_key: TENOR_KEY,
      q: query,
      limit: perPage,
      offset: (page - 1) * perPage,
    },
  });

  console.log(response.data);
  return response.data;
};