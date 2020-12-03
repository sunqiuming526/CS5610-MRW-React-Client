import React from "react";
import { connect } from "react-redux";
import articleService from "../services/articleService";
import {FETCH_ARTICLE_BY_ID} from "../reducers/ReducerTypes";

class ArticleDetailsComponent extends React.Component {
    state ={
        article: {},
        isAuthor: false
    }

    componentDidMount() {
        const articleId = this.props.match.params.articleId;
        const userId = this.props.match.params.userId;
        console.log(articleId)
        this.props.findArticleById(articleId);

        if (userId) {
             //find the author
            this.state.isAuthor = true;
        }
    }

    render(){
        return(
            <div>
                <h1>{this.props.article.title}</h1>
                <p>{this.props.article.text}</p>

            </div>

        );
    }
}

const stateToPropertyMapper = (state) => ({
    article: state.articleReducer.article
});

const propertyToDispatchMapper = (dispatch) => ({
    findArticleById: (articleId) => {
        articleService.findArticleById(articleId)
            .then((article) => {
                dispatch({type: FETCH_ARTICLE_BY_ID, article})
            });
    },

});

export default connect
(stateToPropertyMapper, propertyToDispatchMapper)
(ArticleDetailsComponent);
