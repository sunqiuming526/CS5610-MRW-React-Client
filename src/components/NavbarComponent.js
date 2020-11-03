import React from "react";
import {connect} from "react-redux";
import Navbar from "react-bootstrap/cjs/Navbar";
import Nav from "react-bootstrap/cjs/Nav";
import Button from "react-bootstrap/Button";
import {Form, FormControl} from "react-bootstrap";
import ReducerTypes from "../reducers/ReducerTypes";
import imdbService from "../services/ImdbService"

const NavbarComponent =
  ({
     keyword = '',
     typeKeyword,
     searchMovies,
   }) =>
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">Movie Review</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#features">Feature1</Nav.Link>
        <Nav.Link href="#pricing">Feature2</Nav.Link>
      </Nav>
      <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2"
                     onChange={event => typeKeyword(event.target.value)
                     }
                     value={keyword}/>
        <Button variant="outline-info"
                onClick={() => searchMovies(keyword)}>Search</Button>
      </Form>
    </Navbar>

const stateToPropertyMapper = state => ({
  keyword: state.navBarReducer.keyword
})

const propertyToDispatchMapper = (dispatch) => ({
  typeKeyword: (keyword) => dispatch({
    type: ReducerTypes.TYPE_KEYWORD,
    keyword: keyword
  }),
  searchMovies: (keyword) => imdbService.findByTitle(keyword).then(res => {
    return dispatch({
      type: ReducerTypes.FIND_MOVIES_BY_TITLE,
      movies: res
    })
  })

})

export default connect(stateToPropertyMapper, propertyToDispatchMapper)(NavbarComponent)

