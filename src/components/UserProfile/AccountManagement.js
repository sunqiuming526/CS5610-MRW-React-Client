import React, {useEffect, useState} from "react";
import axios from 'axios'
import {ACCESS_TOKEN_NAME, API_BASE_URL} from '../../constants/ApiConstants';

const AccountManagement = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/users`, {})
      .then(res => {
        setUsers(res.data)
      })
  }, [])

  return (
    <div>
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
          users.map(user => <tr>
            <td><strong>{user.username}</strong></td>
            <td>{user.email}</td>
            <td>{user.role}</td>
          </tr>)
        }
        </tbody>
      </table>

    </div>
  )
}

export default AccountManagement
