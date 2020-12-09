import ReducerTypes from "./ReducerTypes";

const initialState = {
  movies: [],
  movie: {}
}

const MovieReducer = (state = initialState, action) => {
  switch (action.type) {
    case ReducerTypes.SEARCH_KEYWORD:
      return {
        ...state,
        keyword: action.keyword
      }
    case ReducerTypes.TYPE_KEYWORD:
      return {
        ...state,
        keyword: action.keyword
      }
    case ReducerTypes.FIND_MOVIES_BY_TITLE:
      return {
        ...state,
        movies: action.movies
      }
    case ReducerTypes.FETCH_MOVIES:
      return {
        ...state,
        movies: action.movies
      }
    case ReducerTypes.FETCH_MOVIE:
      return {
        ...state,
        movie: action.movie
      }
    default:
      return state;
  }
}

export default MovieReducer