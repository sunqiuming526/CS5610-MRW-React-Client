import axios from "axios";
import React, { useEffect, useState } from "react";
import { Dropdown, FormControl, InputGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/cjs/Nav";
import Navbar from "react-bootstrap/cjs/Navbar";
import { connect } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { ACCESS_TOKEN_NAME, API_BASE_URL } from "../constants/ApiConstants";
import ReducerTypes, {
  FETCH_MOVIES,
  FIND_ARTICLES_BY_KEYWORD,
} from "../reducers/ReducerTypes";
import articleService from "../services/articleService";
import {
  default as imdbService,
  default as ImdbService,
} from "../services/ImdbService";

const NavbarComponent = ({
  keyword = "",
  typeKeyword,
  fetchMoviesByTitle,
  findArticlesByTitle,
  loginUser,
  getLoginUser,
}) => {
  let location = useLocation();
  let history = useHistory();
  const [searchType, setSearchType] = useState("Movie");
  const [user, setUser] = useState({ username: "" });

  useEffect(() => {
    axios
      .get(API_BASE_URL + "/users/me", {
        headers: { token: localStorage.getItem(ACCESS_TOKEN_NAME) },
      })
      .then(function (response) {
        if (response.status == 200) {
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
        <Nav.Link as={Link} to="/home">
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

        {searchType === "Movie" && (
          <Button
            variant="outline-info"
            onClick={() => {
              history.push(`/movies?name=${keyword}`);
              fetchMoviesByTitle(keyword);
            }}
          >
            Search
          </Button>
        )}
        {searchType === "Actor" && (
          <Button
            variant="outline-info"
            onClick={() => history.push(`/actors?name=${keyword}`)}
          >
            Search
          </Button>
        )}
        {searchType === "Article" && (
          <Button
            variant="outline-info"
            onClick={() => findArticlesByTitle(keyword)}
          >
            Search
          </Button>
        )}
        {user.username && (
          <Button
            variant="outline-info"
            onClick={() => {
              console.log(location.pathname);
              handleLogout();
            }}
          >
            Logout
          </Button>
        )}
        {!user.username && (
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
  searchType: state.navBarReducer.searchType,
});

const propertyToDispatchMapper = (dispatch) => ({
  typeKeyword: (keyword) =>
    dispatch({
      type: ReducerTypes.TYPE_KEYWORD,
      keyword: keyword,
    }),
  fetchMoviesByTitle: (title) => {
    ImdbService.fetchMoviesByTitle(title).then((movies) => {
      return dispatch({ type: FETCH_MOVIES, movies });
    });
  },
  getLoginUser: () => {
    return axios
      .get(API_BASE_URL + "/users/me", {
        headers: { token: localStorage.getItem(ACCESS_TOKEN_NAME) },
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
    articleService.findArticlesByTitle(keyword).then((articles) =>
      dispatch({
        type: FIND_ARTICLES_BY_KEYWORD,
        articles,
      })
    );
  },
  updateSearchType: (type) => {
    return dispatch({
      type: ReducerTypes.UPDATE_SEARCH_TYPE,
      searchType: type,
    });
  },
});

export default connect(
  stateToPropertyMapper,
  propertyToDispatchMapper
)(NavbarComponent);
