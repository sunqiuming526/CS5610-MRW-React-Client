import ReducerTypes from "./ReducerTypes";

const initialState = {}

const NavBarReducer = (state = initialState, action) => {
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
    default:
      return state;
  }
}

export default NavBarReducer