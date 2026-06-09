const BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_KEY
const IMG_BASE = 'https://image.tmdb.org/t/p'

// Helper: builds a full image URL from the partial path TMDB gives us
// size options: w200, w300, w500, w780, original
export const getPosterUrl = (path, size = 'w500') =>
  path ? `${IMG_BASE}/${size}${path}` : null

export const getBackdropUrl = (path, size = 'w1280') =>
  path ? `${IMG_BASE}/${size}${path}` : null

// Helper: all API calls go through this so error handling lives in one place
const fetcher = async (endpoint) => {
  const res = await fetch(`${BASE_URL}${endpoint}&api_key=${API_KEY}`)
  if (!res.ok) throw new Error(`TMDB error: ${res.status}`)
  return res.json()
}

// Home page — the three sections
export const getTrending = () =>
  fetcher('/trending/movie/week?language=en-US')

export const getPopular = () =>
  fetcher('/movie/popular?language=en-US')

export const getNowPlaying = () =>
  fetcher('/movie/now_playing?language=en-US')

// Search page
export const searchMovies = (query, page = 1) =>
  fetcher(`/search/movie?query=${encodeURIComponent(query)}&page=${page}&language=en-US`)

// Search with genre filter
export const discoverMovies = (genreId, page = 1) =>
  fetcher(`/discover/movie?with_genres=${genreId}&sort_by=popularity.desc&page=${page}&language=en-US`)

// Movie detail page
// append_to_response=credits fetches cast in the same request — one call instead of two
export const getMovieDetail = (id) =>
  fetcher(`/movie/${id}?append_to_response=credits,videos,similar&language=en-US`)

// Genre list — used to build filter dropdowns
export const getGenres = () =>
  fetcher('/genre/movie/list?language=en-US')
