import ArticleReducer from "./ArticleReducer";

const initialState = {
    role: ""
}

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FIND_USERROLE__BY_ID":
            return {
                ...state,
                role: action.role
            }
        default:
            return state;
    }

}

export default UserReducer
