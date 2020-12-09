import {API_BASE_URL, API_USERS_URL} from "../constants/ApiConstants";

export const updateUser = (userId, newUser) => {
  return fetch(`${API_USERS_URL}/${userId}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newUser)
  }).then(res => res.json())
}

const userService = {
  updateUser
}

export default userService
