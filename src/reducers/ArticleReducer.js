import {FIND_ARTICLES_BY_KEYWORD, FETCH_ARTICLES, FETCH_ARTICLE, FETCH_ARTICLES_BY_AUTHOR, FETCH_ARTICLE_BY_ID} from "./ReducerTypes";

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
            return {
                ...state,
                articles: action.articles
            }
        case FETCH_ARTICLE:
            return {
                ...state,
                article: action.article
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
        default:
            return state;
    }
}

export default ArticleReducer

