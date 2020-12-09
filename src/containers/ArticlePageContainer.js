import React from "react";
import { connect } from "react-redux";
import ArticleGridComponent from "../components/article/ArticleGridComponent";
import articleService from "../services/articleService";
import {ADD_ARTICLE, DELETE_ARTICLE, FETCH_ARTICLES, FIND_ARTICLES_BY_KEYWORD} from "../reducers/ReducerTypes";
import '../css/style.css'
import userService from "../services/UserService";

class ArticlePageContainer extends React.Component{
    state = {
        articles:[],
        article: {},
        isAuthor: false,
        AuthorName: "",
        userId: "",
        role: ""
    }
    componentDidMount() {
        //this.setState({userId: this.props.match.params.userId});
        this.state.userId = this.props.match.params.userId

        if (this.state.userId && this.props.role === 'author') {
            // check if the user type is author, if true, get the author name
            this.state.isAuthor = true;
        }
        this.props.findAllArticles();
        // console.log("articles in props: " + this.props.articles.length)
        // console.log("articles in state: " + this.state.articles.length)
        // console.log("userId" + this.state.userId)
    }


    render() {
        return (
            <div>
                {/*<NavbarComponent findArticlesByTitle={this.props.findArticlesByTitle}/>*/}
                <div className="sticky-box">
                {
                    this.state.isAuthor &&
                    <button type="button" className="btn btn-success float-left"
                            onClick={()=>this.props.addArticle(this.state.userId)}>
                        Add Article
                    </button>
                }
                </div>
                <ArticleGridComponent articles={this.props.articles}
                                      userId = {this.state.userId}
                                      deleteArticle = {this.props.deleteArticle} />
            </div>
        );
    }
}

const stateToPropertyMapper = (state) => ({
    articles: state.articleReducer.articles
})

const propertyToDispatchMapper = (dispatch) => {
    return {
        // get the author name
        findUserById: (userId) => {
            userService.findUserById(userId)
                .then(res => {
                    var role = JSON.parse(res).role;
                    dispatch({type: "FIND_USERROLE__BY_ID", role})

                });
        },

        findAllArticles: () => {
            articleService.findAllArticles()
                .then((articles) => dispatch({type: FETCH_ARTICLES, articles}));
        },

        addArticle: (userId) => {
            //console.log(state)
            const newArticle = {
                title: 'New Article',
                text: 'Please write your article here.',
                authorId: userId
            }
            articleService.createArticle(newArticle)
                .then(actualArticle => dispatch({type: ADD_ARTICLE, article: actualArticle}));
        },

        deleteArticle: (article) => {
            articleService.deleteArticle(article._id)
                .then(articleId => {
                    //console.log("delete " + articleId);
                    return dispatch({type: DELETE_ARTICLE, articleId})
                })
        },

        findArticlesByTitle: (keyword) => {
            articleService.findArticlesByTitle(keyword)
                .then((articles) => dispatch({
                    type: FIND_ARTICLES_BY_KEYWORD,
                    articles
                }))
        }
    };
}


export default connect
(stateToPropertyMapper, propertyToDispatchMapper)
(ArticlePageContainer)
