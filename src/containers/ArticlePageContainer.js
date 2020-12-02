import React from "react";
import { connect } from "react-redux";
import ArticleGridComponent from "../components/article/ArticleGridComponent";
import articleService from "../services/articleService";
import articleReducer from "../reducers/ArticleReducer"
import {BrowserRouter, Link} from "react-router-dom";
import {FETCH_ARTICLES} from "../reducers/ReducerTypes";

class ArticlePageContainer extends React.Component{
    state = {
        articles:[],
        article: {},
        isAuthor: false,
        AuthorName: "",

    }
    componentDidMount() {
        const userID = this.props.match.params.userID;
        if (userID) {
            // check if the user type is author, if true, get the author name
        }
        this.props.fetchAllArticles();
    }

    render() {
        return (
            <div>
                {
                    this.state.isAuthor &&
                    <Link to="/edit">
                        <button className="btn-primary">
                            Add
                        </button>
                    </Link>
                }
                <ArticleGridComponent articles={this.props.articles}/>
            </div>
        );
    }
}

const stateToPropertyMapper = (state) => ({
    articles: state.articleReducer.articles
})

const propertyToDispatchMapper = (dispatch) => ({
    // get the author name
    fetchAllArticles: () => {
        articleService.findAllArticles()
            .then((articles) => dispatch({type: FETCH_ARTICLES, articles}));
    }
})


export default connect
(stateToPropertyMapper, propertyToDispatchMapper)
(ArticlePageContainer)
