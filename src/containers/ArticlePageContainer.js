import React from "react";
import { connect } from "react-redux";
import ArticleGridComponent from "../components/article/ArticleGridComponent";
import articleService from "../services/articleService";
import {ADD_ARTICLE, DELETE_ARTICLE, FETCH_ARTICLES} from "../reducers/ReducerTypes";
import '../css/style.css'

class ArticlePageContainer extends React.Component{
    state = {
        articles:[],
        article: {},
        isAuthor: false,
        AuthorName: "",
        userId: ""
    }
    componentDidMount() {
        //this.setState({userId: this.props.match.params.userId});
        this.state.userId = this.props.match.params.userId
        if (this.state.userId) {
            // check if the user type is author, if true, get the author name
            this.state.isAuthor = true;
        }
        this.props.findAllArticles();
        console.log("articles in props: " + this.props.articles.length)
        console.log("articles in state: " + this.state.articles.length)
        console.log("userId" + this.state.userId)
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        this.props.findAllArticles();
    }

    // deleteArticle = (article) => {
    //     articleService.deleteArticle(article._id)
    //         .then(state => this.setState(prevState => ({
    //             articles: prevState.articles.filter(a => a._id !== article._id)
    //         })))
    // }

    render() {
        return (
            <div>
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

const propertyToDispatchMapper = (dispatch) => ({
    // get the author name
    findAllArticles: () => {
        articleService.findAllArticles()
            .then((articles) => dispatch({type: FETCH_ARTICLES, articles}));
    },

    addArticle: (userId) =>{
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
            .then(article => dispatch({type: DELETE_ARTICLE, article}))
    },
})


export default connect
(stateToPropertyMapper, propertyToDispatchMapper)
(ArticlePageContainer)
