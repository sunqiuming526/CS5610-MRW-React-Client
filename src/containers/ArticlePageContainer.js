import React from "react";
import { connect } from "react-redux";
import ArticleGridComponent from "../components/article/ArticleGridComponent";
import articleService from "../services/articleService";
import {Link} from "react-router-dom";
import {FETCH_ARTICLES} from "../reducers/ReducerTypes";
import '../css/style.css'

class ArticlePageContainer extends React.Component{
    state = {
        articles:[],
        article: {},
        isAuthor: false,
        AuthorName: "",
    }
    componentDidMount() {
        const userId = this.props.match.params.userId;
        if (userId) {
            // check if the user type is author, if true, get the author name
            this.state.isAuthor = true;
        }
        this.props.findAllArticles();
    }

    render() {
        return (
            <div>
                <div className="sticky-box">
                {
                    this.state.isAuthor &&
                    <Link to="/edit">
                        <button type="button" className="btn btn-success float-left">
                            Add Article
                        </button>
                    </Link>
                }
                </div>
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
    findAllArticles: () => {
        articleService.findAllArticles()
            .then((articles) => dispatch({type: FETCH_ARTICLES, articles}));
    },


})


export default connect
(stateToPropertyMapper, propertyToDispatchMapper)
(ArticlePageContainer)
