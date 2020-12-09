import {API_BASE_URL, API_USERS_URL} from "../constants/ApiConstants";

export const removeMovieFromWatchlist = (userId, movieId) => {
  return fetch(`${API_USERS_URL}/${userId}/movies/${movieId}`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({addMovie: false})
  }).then(res => res.json())
}

export const addMovieToWatchlist = (userId, movieId) => {
  return fetch(`${API_USERS_URL}/${userId}/movies/${movieId}`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({addMovie: true})
  }).then(res => res.json())
}

const watchlistService = {
  removeMovieFromWatchlist,
  addMovieToWatchlist
}

export default watchlistService
