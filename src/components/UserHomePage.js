import React, {useEffect, useState} from 'react'
import {Link, Route, Switch, withRouter, useParams} from 'react-router-dom';
import {ACCESS_TOKEN_NAME, API_BASE_URL, API_USERS_URL} from '../constants/ApiConstants';
import axios from 'axios'
import {Nav} from "react-bootstrap";
import {NavLink} from "react-bootstrap";
import UserProfile from "./UserProfile/UserProfile";
import MyComment from "./UserProfile/MyComments";
import AccountManagement from "./UserProfile/AccountManagement";
import Watchlist from "./UserProfile/Watchlist";
import EditProfileComponent from "./UserProfile/EditProfileComponent";
import ArticlePageContainer from "../containers/ArticlePageContainer";

const UserHomePage = (props) => {
  const [loginUser, setLoginUser] = useState({username: ''});
  const [targetUser, setTargetUser] = useState({})

  let urlParams = useParams();

  useEffect(() => {
    axios.get(API_BASE_URL + '/users/me', {headers: {'token': localStorage.getItem(ACCESS_TOKEN_NAME)}})
      .then(function (response) {
        if (response.status !== 200) {
          redirectToLogin()
        }
        setLoginUser(response.data)
      })
      .catch(function (error) {
        redirectToLogin()
      });
  }, [])

  useEffect(() => {
      if (!urlParams.userId) {
        setTargetUser(loginUser)
        return
      }
      axios.get(`${API_USERS_URL}/${urlParams.userId}`)
        .then(function (response) {
          if (response.status !== 200) {
            redirectToLogin()
          }
          setTargetUser(response.data)
        })
        .catch(function (error) {
          console.log(error)
          redirectToLogin()
        });
    }, [loginUser]
  )

  const redirectToLogin = () => {
    props.history.push('/login');
  }
  return (
    <div className="container-fluid">
      <div className="row my-2">

        <div className="col-lg-4 order-lg-1 text-center">
          <img src="https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_1280.png"
               width={"250px"} className="mx-auto img-fluid img-circle d-block" alt="avatar"/>
          <h6 className="mt-2">Upload a different photo</h6>
          <label className="custom-file">
            <input type="file" id="file" className="custom-file-input"/>
            <span className="custom-file-control">Choose file</span>
          </label>
        </div>

        <div className="col-lg-8 order-lg-2">
          <Nav variant="tabs" defaultActiveKey="/home">
            <Nav.Item>
              <NavLink as={Link} to={`/users/${targetUser._id}/profile`} eventKey={"profile"}>Profile</NavLink>
            </Nav.Item>
            {
              targetUser._id === loginUser._id &&
              <Nav.Item>
                <NavLink as={Link} to={`/users/${targetUser._id}/edit`} eventKey={"edit"}>Edit</NavLink>
              </Nav.Item>
            }
            <Nav.Item>
              <NavLink as={Link} to={`/users/${targetUser._id}/comments`} eventKey={"comments"}>Comments</NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink as={Link} to={`/users/${targetUser._id}/watchlist`} eventKey={"watchlist"}>Watchlist</NavLink>
            </Nav.Item>

            {
              loginUser.role === "admin" &&
              <Nav.Item>
                <NavLink as={Link} to={`/users/${targetUser._id}/account-management`} eventKey={"account-management"}>Account
                  Management</NavLink>
              </Nav.Item>
            }
            {loginUser.role === 'author' &&
            <Nav.Item>
              <NavLink as={Link} to={`/users/${targetUser._id}/articles`}
                       eventKey={"account-management"}>Articles</NavLink>
            </Nav.Item>
            }
          </Nav>

          <Switch>
            <Route path={`/users/${targetUser._id}/profile`}>
              <UserProfile user={targetUser}/>
            </Route>
            <Route path={`/users/${targetUser._id}/comments`}>
              <MyComment user={targetUser}/>
            </Route>
            <Route path={`/users/${targetUser._id}/account-management`}>
              <AccountManagement/>
            </Route>
            <Route path={`/users/:userId/articles`} component={ArticlePageContainer}/>
            <Route path={`/users/${targetUser._id}/watchlist`}>
              <Watchlist user={targetUser}/>
            </Route>
            <Route path={`/users/${targetUser._id}/edit`}>
              <EditProfileComponent user={targetUser}/>
            </Route>
          </Switch>

        </div>

      </div>
    </div>
  )

}

export default withRouter(UserHomePage)
