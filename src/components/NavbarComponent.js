import React, {useState} from "react";
import { connect } from "react-redux";
import Navbar from "react-bootstrap/cjs/Navbar";
import Nav from "react-bootstrap/cjs/Nav";
import Button from "react-bootstrap/Button";
import { Form, FormControl } from "react-bootstrap";
import ReducerTypes, {FIND_ARTICLES_BY_KEYWORD} from "../reducers/ReducerTypes";
import imdbService from "../services/ImdbService";
import articleService from "../services/articleService";
import Dropdown from "react-bootstrap/Dropdown";
import Select from "react-dropdown-select";

const NavbarComponent = ({ keyword = "", typeKeyword, searchMovies, findArticlesByTitle, updateSearchType, searchType = "movie"}) => (
  <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home">Movie Review</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#features">Feature1</Nav.Link>
      <Nav.Link href="#pricing">Feature2</Nav.Link>
    </Nav>
      <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
              Keyword
          </Dropdown.Toggle>
          <Dropdown.Menu>
              <Dropdown.Item href="#/action-1" value="movie"
                             onSelect={() => updateSearchType("movie")}
              >Movie
              </Dropdown.Item>
              <Dropdown.Item href="#/action-2" value="article"
                             onSelect={() => updateSearchType("article")}
              >Article
              </Dropdown.Item>
          </Dropdown.Menu>
      </Dropdown>
    <Form inline>
      <FormControl
        type="text"
        placeholder="Search"
        className="mr-sm-2"
        onChange={(event) => typeKeyword(event.target.value)}
        value={keyword}
      />
      {
          searchType === "movie" &&
          <Button variant="outline-info"
                  onClick={() => searchMovies(keyword)}>
              Search1
          </Button>
      }
      {
          searchType === "article" &&
          <Button variant="outline-info"
                  onClick={()=>{
                      findArticlesByTitle(keyword)
                  }}>
              Search2
          </Button>
      }

    </Form>
  </Navbar>
);


const stateToPropertyMapper = (state) => ({
  keyword: state.navBarReducer.keyword,
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
    findArticlesByTitle: (keyword) => {
        articleService.findArticlesByTitle(keyword)
            .then((articles) => dispatch({
                type:FIND_ARTICLES_BY_KEYWORD,
                articles
            }))
    },
    updateSearchType:(type) => {
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
