import {FIND_ARTICLES_BY_KEYWORD, FETCH_ARTICLES, FETCH_ARTICLE,
    FETCH_ARTICLES_BY_AUTHOR, FETCH_ARTICLE_BY_ID,
    ADD_ARTICLE, UPDATE_ARTICLE, DELETE_ARTICLE} from "./ReducerTypes";

const initialState = {
    articles: [],
    article: {}
}

const ArticleReducer = (state = initialState, action) => {
    switch (action.type) {
        case FIND_ARTICLES_BY_KEYWORD:
            return {
                ...state,
                articles: action.articles
            }
        case FETCH_ARTICLES:
            console.log(action.articles);
            return {
                ...state,
                articles: action.articles
            }

        case FETCH_ARTICLES_BY_AUTHOR:
            return {
                ...state,
                articles: action.articles
            }
        case FETCH_ARTICLE_BY_ID:
            return {
                ...state,
                article: action.article
            }
        case DELETE_ARTICLE:
            return {
                ...state,
                articles: state.articles.filter(article => article._id !== action.article._id)
            }
        case ADD_ARTICLE:
            return {
                ...state,
                articles: [
                    ...state.articles,
                    action.article
                ]
            }
        default:
            return state;
    }
}

export default ArticleReducer

