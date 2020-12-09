import {FIND_ARTICLES_BY_KEYWORD, FETCH_ARTICLES, FETCH_ARTICLE,
    FETCH_ARTICLES_BY_AUTHOR, FETCH_ARTICLE_BY_ID,
    ADD_ARTICLE, UPDATE_ARTICLE, DELETE_ARTICLE, ON_CHANGE} from "./ReducerTypes";

const initialState = {
    articles: [],
    article: {}
}

const ArticleReducer = (state = initialState, action) => {
    switch (action.type) {
        case FIND_ARTICLES_BY_KEYWORD:
            //console.log("FIND_ARTICLES_BY_KEYWORD");
            return {
                ...state,
                articles: action.articles
            }
        case FETCH_ARTICLES:
            //console.log("FETCH_ARTICLES");
            return {
                ...state,
                articles: action.articles
            }

        case FETCH_ARTICLES_BY_AUTHOR:
            //console.log("FETCH_ARTICLES_BY_AUTHOR");
            return {
                ...state,
                articles: action.articles
            }
        case FETCH_ARTICLE_BY_ID:
            //console.log("FETCH_ARTICLE_BY_ID");
            return {
                ...state,
                article: action.article
            }
        case DELETE_ARTICLE:
            //console.log("DELETE_ARTICLE");
            return {
                ...state,
                articles: state.articles.filter(article => article._id !== action.articleId)
            }
        case UPDATE_ARTICLE:
            //console.log(action.article.editing);
            //console.log("UPDATE_ARTICLE");
            return {
                ...state,
                articles: state.articles.map(
                    article => article._id === action.article._id ?
                        action.article : article)
            }
        case ON_CHANGE:
            //console.log("ON_CHANGE");
            return {
                ...state,
                article: action.article
            }
        case ADD_ARTICLE:
            //console.log("ADD_ARTICLE");
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

