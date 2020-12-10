import React, {useEffect, useState} from "react";
import axios from 'axios'
import {ACCESS_TOKEN_NAME, API_BASE_URL} from '../../constants/ApiConstants';
import {Button} from "react-bootstrap";
import {updateMultipleUsers} from "../../services/UserService";

const AccountManagement = ({user, loginUser}) => {

  const [users, setUsers] = useState([]);

  const updateUser = (updatedUser) => {
    setUsers(users.map(user => user._id === updatedUser._id ? updatedUser : user))
  }

  useEffect(() => {
    axios.get(`${API_BASE_URL}/users`, {})
      .then(res => {
        setUsers(res.data)
      })
  }, [])

  return (
    <div>
      {
        loginUser && loginUser._id === user._id && loginUser.role === 'admin' &&
        <>
          <h5 className="mb-3">Account Management</h5>
          <table className="table table-sm table-hover table-striped">
            <thead>
            <tr>
              <td>Username</td>
              <td>Email</td>
              <td>Role</td>
            </tr>
            </thead>
            <tbody>
            {
              users.map(user =>
                <tr key={user._id}>
                  <td>
                    <input type="text" value={user.username} onChange={(e) => {
                      user.username = e.target.value
                      updateUser(user)
                    }}/>
                  </td>
                  <td>
                    <input type="email" value={user.email} onChange={(e) => {
                      user.email = e.target.value
                      updateUser(user)
                    }}/>
                  </td>
                  <td>
                    <select className="form-control text-center"
                            id="role"
                            value={user.role}
                            onChange={(e) => {
                              user.role = e.target.value
                              updateUser(user)
                            }}>
                      <option value="admin">Administrator</option>
                      <option value="user">User</option>
                      <option value="author">Author</option>
                    </select>
                  </td>
                </tr>
              )
            }
            </tbody>
          </table>
          <Button className="btn btn-primary"
                  onClick={() => {
                    updateMultipleUsers(users)
                  }}>
            Submit
          </Button>
        </>
      }
    </div>
  )
}

export default AccountManagement
