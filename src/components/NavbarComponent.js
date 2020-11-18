import React from "react";
import {connect} from "react-redux";
import Navbar from "react-bootstrap/cjs/Navbar";
import Nav from "react-bootstrap/cjs/Nav";
import Button from "react-bootstrap/Button";
import {Form, FormControl} from "react-bootstrap";
import ReducerTypes from "../reducers/ReducerTypes";
import imdbService from "../services/ImdbService";
import {useLocation, useHistory} from "react-router-dom"
import {ACCESS_TOKEN_NAME} from "../constants/ApiConstants";

const NavbarComponent = ({keyword = "", typeKeyword, searchMovies}) => {

  let location = useLocation();
  let history = useHistory();
  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN_NAME)
    history.push('/login')
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">Movie Review</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#features">Feature1</Nav.Link>
        <Nav.Link href="#pricing">Feature2</Nav.Link>
      </Nav>
      <Form inline>
        <FormControl
          type="text"
          placeholder="Search"
          className="mr-sm-2"
          onChange={(event) => typeKeyword(event.target.value)}
          value={keyword}
        />
        <Button variant="outline-info" onClick={() => searchMovies(keyword)}>
          Search
        </Button>
        {
          localStorage.getItem(ACCESS_TOKEN_NAME) &&
          <Button variant="outline-info" onClick={() => {
            console.log(location.pathname)
            handleLogout()
          }}>
            Logout
          </Button>
        }
        {
          !localStorage.getItem(ACCESS_TOKEN_NAME) &&
          <Button variant="outline-info" onClick={() => {
            console.log(location.pathname)
            history.push("/login")
          }}>
            Login
          </Button>
        }
      </Form>
    </Navbar>
  )
};

const stateToPropertyMapper = (state) => ({
  keyword: state.navBarReducer.keyword,
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
});

export default connect(
  stateToPropertyMapper,
  propertyToDispatchMapper
)(NavbarComponent);
