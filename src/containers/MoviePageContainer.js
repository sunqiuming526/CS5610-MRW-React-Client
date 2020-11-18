import React, { Component } from "react";
import { connect } from "react-redux";
import MovieGridComponent from "../components/MovieGridComponent";
import NavbarComponent from "../components/NavbarComponent";
import { FETCH_MOVIES } from "../reducers/ReducerTypes";
import ImdbService from "../services/ImdbService";

const NUM_POPULAR_MOVIES = 40

class MoviePageContainer extends Component {
  componentDidMount() {
    const userID = this.props.match.params.userID;
    if (userID) {
      this.props.fetchMoviesForUser(userID);
    } else {
      this.props.fetchPopularMovies(NUM_POPULAR_MOVIES);
    }
  }

  render() {
    return (
      <MovieGridComponent movies={this.props.movies} />
    );
  }
}

const stateToProps = (state) => ({
  movies: state.movieReducer.movies,
});

const dispatchToProps = (dispatch) => ({
  fetchMoviesForUser: (userID) =>
    ImdbService.fetchMoviesForUser(userID).then((movies) =>
      dispatch({ type: FETCH_MOVIES, movies })
    ),
  fetchPopularMovies: (numMovies) =>
    ImdbService.fetchPopularMovies(numMovies).then((movies) =>
      dispatch({ type: FETCH_MOVIES, movies })
    ),
});

export default connect(stateToProps, dispatchToProps)(MoviePageContainer);
