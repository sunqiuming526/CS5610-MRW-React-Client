import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import Navbar from "react-bootstrap/cjs/Navbar";
import Nav from "react-bootstrap/cjs/Nav";
import Button from "react-bootstrap/Button";
import {Form, FormControl, InputGroup, Dropdown} from "react-bootstrap";
import ReducerTypes, {FETCH_MOVIES, FIND_ARTICLES_BY_KEYWORD} from "../reducers/ReducerTypes";
import imdbService from "../services/ImdbService";
import {useLocation, useHistory, Link} from "react-router-dom"
import {ACCESS_TOKEN_NAME, API_BASE_URL} from "../constants/ApiConstants";
import ImdbService from "../services/ImdbService";
import axios from "axios";
import articleService from "../services/articleService";
import Select from "react-dropdown-select";


const NavbarComponent =
  ({
     keyword = "",
     typeKeyword,
     fetchMoviesByTitle,
     loginUser,
     getLoginUser,
     searchMovies,
     findArticlesByTitle,
   }) => {
    let location = useLocation();
    let history = useHistory();
    const [searchType, setSearchType] = useState("Movie");
    const [user, setUser] = useState({username: ""});
    // const []

    useEffect(() => {
      axios
        .get(API_BASE_URL + "/users/me", {
          headers: {token: localStorage.getItem(ACCESS_TOKEN_NAME)},
        })
        .then(function (response) {
          if (response.status === 200) {
            setUser(response.data);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }, []);

    const handleLogout = () => {
      localStorage.removeItem(ACCESS_TOKEN_NAME);
      history.push("/login");
    };

    return (
      <Navbar bg="dark" variant="dark" className="mb-4">
        <Navbar.Brand as={Link} to="/">
          Movie Review
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to={`/users/${user._id}/profile`}>
            Profile
          </Nav.Link>
          <Nav.Link as={Link} to="/articles">
            Articles
          </Nav.Link>
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
          {
            searchType === "Movie" &&
            <Button variant="outline-info" onClick={() => {
              history.push(`/movies?name=${keyword}`)
              fetchMoviesByTitle(keyword)
            }}>
              Search
            </Button>
          }
          {searchType === "Actor" && (
            <Button
              variant="outline-info"
              onClick={() => history.push(`/actors?name=${keyword}`)}
            >
              Search
            </Button>
          )}
          {
            searchType === "Article" &&
            <Button variant="outline-info" onClick={() => findArticlesByTitle(keyword)}>
              Search
            </Button>
          }
          {
            localStorage.getItem(ACCESS_TOKEN_NAME) &&
            <Button variant="outline-info" onClick={() => {
              console.log(location.pathname)
              handleLogout()
            }}>
              Logout
            </Button>
          }
          {!localStorage.getItem(ACCESS_TOKEN_NAME) && (
            <Button
              variant="outline-info"
              onClick={() => {
                console.log(location.pathname);
                history.push("/login");
              }}
            >
              Login
            </Button>
          )}
        </InputGroup>
        {/*</Form>*/}
      </Navbar>
    );
  };

const stateToPropertyMapper = (state) => ({
  keyword: state.navBarReducer.keyword,
  loginUser: state.navBarReducer.loginUser,
  searchType: state.navBarReducer.searchType
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
      return dispatch({type: FETCH_MOVIES, movies});
    });
  },
  getLoginUser: () => {
    return axios
      .get(API_BASE_URL + "/users/me", {
        headers: {token: localStorage.getItem(ACCESS_TOKEN_NAME)},
      })
      .then((response) => {
        return dispatch({
          type: ReducerTypes.GET_LOGIN_USER,
          loginUser: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  findArticlesByTitle: (keyword) => {
    articleService.findArticlesByTitle(keyword)
      .then((articles) => dispatch({
        type: FIND_ARTICLES_BY_KEYWORD,
        articles
      }))
  },
  updateSearchType: (type) => {
    return dispatch({
      type: ReducerTypes.UPDATE_SEARCH_TYPE,
      searchType: type
    })
  }
});

export default connect(
  stateToPropertyMapper,
  propertyToDispatchMapper
)(NavbarComponent);
