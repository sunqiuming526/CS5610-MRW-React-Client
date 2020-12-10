import ReducerTypes from "./ReducerTypes";

const initialState = {
  actor: {},
  actors: [],
};

const ActorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ReducerTypes.FETCH_ACTOR:
      return {
        ...state,
        actor: action.actor,
      };
    case ReducerTypes.FETCH_ACTORS:
      return {
        ...state,
        actors: action.actors,
      };
    default:
      return state;
  }
};

export default ActorReducer;
