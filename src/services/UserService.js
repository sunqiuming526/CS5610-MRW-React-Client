import {ACCESS_TOKEN_NAME, API_BASE_URL, API_USERS_URL} from "../constants/ApiConstants";
import axios from "axios";

export const updateUser = (userId, newUser) => {
  return fetch(`${API_USERS_URL}/${userId}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newUser)
  }).then(res => res.json())
}

export const getCurrentUser = () => {
  return axios.get(API_BASE_URL + '/users/me', {headers: {'token': localStorage.getItem(ACCESS_TOKEN_NAME)}})
    .then(response => {
      if (response.status === 200) {
        return response.data
      }
    })
    .catch(function (error) {
      console.log(error)
    });
}

const userService = {
  updateUser
}

export default userService
