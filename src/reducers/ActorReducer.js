import ReducerTypes from './ReducerTypes'

const initialState = {
  actor: {}
}

const ActorReducer = (state=initialState, action) => {
  switch (action.type) {
    case ReducerTypes.FETCH_ACTOR:
      return {
        ...state,
        actor: action.actor,
      }
    default:
      return state;
  }
}

export default ActorReducer;