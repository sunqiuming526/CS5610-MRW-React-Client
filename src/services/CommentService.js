import {API_BASE_URL, API_COMMENTS_URL} from "../constants/ApiConstants";

export const getCommentsForMovie = (movieId) => {
  return fetch(`${API_BASE_URL}/movies/${movieId}/comments`, {
    method: "GET",
  }).then(res => res.json())
}

export const addCommentForMovie = (newComment) => {
  return fetch(`${API_BASE_URL}/comments`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newComment)
  }).then(res => res.json())
    .catch(e => {
      console.log(e)
    })
}

export const getCommentsForUser = (userId) => {
  console.assert(userId)
  return fetch(`${API_BASE_URL}/users/${userId}/comments`, {
    method: "GET",
  }).then(res => res.json())
}

export const deleteComment = (commentId, userId) => {
  return fetch(`${API_COMMENTS_URL}/${commentId}`, {
    method: "DELETE",
    headers: {
      userId
    }
  }).then(res => res.json())
}

export const updateComment = (newComment) => {
  const commentId = newComment._id
  fetch(`${API_COMMENTS_URL}/${commentId}`, {
    method: 'PUT',
    body: JSON.stringify(newComment),
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(response => response.json())
}

const commentService = {
  getCommentsForMovie,
  addCommentForMovie,
  getCommentsForUser,
  deleteComment,
  updateComment
}

export default commentService
