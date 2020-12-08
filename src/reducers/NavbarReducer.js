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

    case ReducerTypes.GET_LOGIN_USER:
      return {
        ...state, loginUser: action.loginUser
      }
    case ReducerTypes.UPDATE_SEARCH_TYPE:
      return {
        ...state,
        searchType: action.searchType
      }
    default:
      return state;
  }
}

export default NavBarReducer
