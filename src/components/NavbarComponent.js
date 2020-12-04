import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import Navbar from "react-bootstrap/cjs/Navbar";
import Nav from "react-bootstrap/cjs/Nav";
import Button from "react-bootstrap/Button";
import {Form, FormControl, InputGroup, Dropdown} from "react-bootstrap";
import ReducerTypes, {FETCH_MOVIES} from "../reducers/ReducerTypes";
import imdbService from "../services/ImdbService";
import {useLocation, useHistory, Link} from "react-router-dom"
import {ACCESS_TOKEN_NAME, API_BASE_URL} from "../constants/ApiConstants";
import ImdbService from "../services/ImdbService";
import axios from "axios";

const NavbarComponent = ({keyword = "", typeKeyword, fetchMoviesByTitle, loginUser, getLoginUser}) => {

  let location = useLocation();
  let history = useHistory();
  const [searchType, setSearchType] = useState("Movie")
  const [user, setUser] = useState({username: ''});

  useEffect(() => {
    axios.get(API_BASE_URL + '/users/me', {headers: {'token': localStorage.getItem(ACCESS_TOKEN_NAME)}})
      .then(function (response) {
        if (response.status == 200) {
          setUser(response.data)
        }
      })
      .catch(function (error) {
        console.log(error)
      });
  }, [])

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN_NAME)
    history.push('/login')
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand as={Link} to="/">Movie Review</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/">Home</Nav.Link>
        <Nav.Link as={Link} to="/home">Profile</Nav.Link>
        <Nav.Link as={Link} to="/articles">Articles</Nav.Link>
      </Nav>
      {/*<Form inline>*/}
      <InputGroup className="w-25">
        <InputGroup.Prepend>
          <Dropdown onSelect={setSearchType}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {searchType}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item eventKey={"Movie"}>Movie</Dropdown.Item>
              <Dropdown.Item eventKey={"Actor"}>Actor</Dropdown.Item>
              <Dropdown.Item eventKey={"Article"}>Article</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </InputGroup.Prepend>
        <FormControl
          type="text"
          placeholder="Search"
          className="mr-sm-2"
          onChange={(event) => typeKeyword(event.target.value)}
          value={keyword}
        />
        <Button variant="outline-info" onClick={() => fetchMoviesByTitle(keyword)}>
          Search
        </Button>
        {
          user.username &&
          <Button variant="outline-info" onClick={() => {
            console.log(location.pathname)
            handleLogout()
          }}>
            Logout
          </Button>
        }
        {
          !user.username &&
          <Button variant="outline-info" onClick={() => {
            console.log(location.pathname)
            history.push("/login")
          }}>
            Login
          </Button>
        }
      </InputGroup>
      {/*</Form>*/}
    </Navbar>
  )
};

const stateToPropertyMapper = (state) => ({
  keyword: state.navBarReducer.keyword,
  loginUser: state.navBarReducer.loginUser
});

const propertyToDispatchMapper = (dispatch) => ({
  typeKeyword: (keyword) =>
    dispatch({
      type: ReducerTypes.TYPE_KEYWORD,
      keyword: keyword,
    }),
  searchMovies: (keyword) =>
    imdbService.findByTitle(keyword).then((res) => {
      return dispatch({
        type: ReducerTypes.FIND_MOVIES_BY_TITLE,
        movies: res,
      });
    }),
  fetchMoviesByTitle: (title) => {
    ImdbService.fetchMoviesByTitle(title).then((movies) => {
      return dispatch({type: FETCH_MOVIES, movies})
    })
  },
  getLoginUser: () => {
    return axios.get(API_BASE_URL + '/users/me', {headers: {'token': localStorage.getItem(ACCESS_TOKEN_NAME)}})
      .then((response) => {
        return dispatch({
          type: ReducerTypes.GET_LOGIN_USER,
          loginUser: response.data
        })
      })
      .catch(function (error) {
        console.log(error)
      });
  }
});

export default connect(
  stateToPropertyMapper,
  propertyToDispatchMapper
)(NavbarComponent);
