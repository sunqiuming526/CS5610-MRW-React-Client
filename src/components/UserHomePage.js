import React, {useEffect, useState} from 'react'
import {Link, Route, Switch, withRouter} from 'react-router-dom';
import {ACCESS_TOKEN_NAME, API_BASE_URL} from '../constants/ApiConstants';
import axios from 'axios'
import {Nav} from "react-bootstrap";
import {NavLink} from "react-bootstrap";
import UserProfile from "./UserProfile/UserProfile";
import MyComment from "./UserProfile/MyComments";
import AccountManagement from "./UserProfile/AccountManagement";

const UserHomePage = (props) => {
  const [user, setUser] = useState({username: ''});

  useEffect(() => {
    axios.get(API_BASE_URL + '/user/me', {headers: {'token': localStorage.getItem(ACCESS_TOKEN_NAME)}})
      .then(function (response) {
        if (response.status !== 200) {
          redirectToLogin()
        }
        setUser(response.data)
      })
      .catch(function (error) {
        redirectToLogin()
      });
  }, [])

  const redirectToLogin = () => {
    props.history.push('/login');
  }
  return (
    <div className="container">
      <div className="row my-2">
        <div className="col-lg-8 order-lg-2">
          <Nav variant="tabs" defaultActiveKey="/home">
            <Nav.Item>
              <NavLink as={Link} to="/home/profile" eventKey={"profile"}>Profile</NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink as={Link} to="/home/edit" eventKey={"edit"}>Edit</NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink as={Link} to="/home/comments" eventKey={"comments"}>Comments</NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink as={Link} to="/home/account-management" eventKey={"account-management"}>Account
                Management</NavLink>
            </Nav.Item>
          </Nav>

          <Switch>
            <Route path="/home/profile">
              <UserProfile user={user}/>
            </Route>
            <Route path="/home/comments">
              <MyComment user={user}/>
            </Route>
            <Route path="/home/account-management">
              <AccountManagement/>
            </Route>
          </Switch>

        </div>
        <div className="col-lg-4 order-lg-1 text-center">
          <img src="https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_1280.png"
               width={"250px"} className="mx-auto img-fluid img-circle d-block" alt="avatar"/>
          <h6 className="mt-2">Upload a different photo</h6>
          <label className="custom-file">
            <input type="file" id="file" className="custom-file-input"/>
            <span className="custom-file-control">Choose file</span>
          </label>
        </div>
      </div>
    </div>
  )

}

export default withRouter(UserHomePage)
