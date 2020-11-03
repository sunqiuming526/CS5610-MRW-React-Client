import React from "react"
import imdbService from "../services/ImdbService"
import {connect} from "react-redux";
import ReducerTypes from "../reducers/ReducerTypes";

const MovieListComponent =
  ({
     movies = [],
     keyword = ''
   }) => {
    return (
      <div>
        <table className="table">
          <thead>
          <tr>
            <th>Title</th>
            <th>Imdb ID</th>
          </tr>
          </thead>
          <tbody>
          {
            movies.map(movie =>
              <tr key={movie.id}>
                <td>{movie.title}</td>
                <td>{movie.id}</td>
              </tr>)
          }
          </tbody>
        </table>
      </div>
    )
  }

const stateToPropertyMapper = state => ({
  keyword: state.navBarReducer.keyword,
  movies: state.movieReducer.movies
})

const propertyToDispatchMapper = (dispatch) => ({
  searchKeyword: (keyword) => {
    dispatch({
      type: ReducerTypes.SEARCH_KEYWORD,
      keyword: keyword
    })
    console.log(keyword)
  },
  typeKeyword: (keyword) => dispatch({
    type: ReducerTypes.TYPE_KEYWORD,
    keyword: keyword
  })
})

export default connect(stateToPropertyMapper, propertyToDispatchMapper)(MovieListComponent)
