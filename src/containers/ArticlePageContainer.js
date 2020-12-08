import React from "react";
import {connect} from "react-redux";
import ArticleGridComponent from "../components/article/ArticleGridComponent";
import articleService from "../services/articleService";
import {ADD_ARTICLE, DELETE_ARTICLE, FETCH_ARTICLES, FIND_ARTICLES_BY_KEYWORD} from "../reducers/ReducerTypes";
import '../css/style.css'
import NavbarComponent from "../components/NavbarComponent";
import {getCurrentUser} from "../services/UserService";

class ArticlePageContainer extends React.Component {
  state = {
    articles: [],
    article: {},
    isAuthor: false,
    AuthorName: "",
    userId: "",
    loginUser: {}
  }

  componentDidMount() {
    console.log(this.props)
    const userId = this.props.match.params.userId;

    getCurrentUser().then(loginUser => this.setState(prev => ({
      ...prev,
      loginUser
    }), () => {
      if (this.state.loginUser) {
        this.setState(prev => ({
          ...prev,
          isAuthor: this.state.loginUser.role === 'author',
          userId: this.state.loginUser._id
        }))
      }
    }))
    if (userId) {
      this.props.findArticlesByAuthor(userId);
    } else {
      this.props.findAllArticles();
    }
    console.log("articles in props: " + this.props.articles.length)
    console.log("articles in state: " + this.state.articles.length)
    console.log("userId" + this.state.userId)
  }


  render() {
    return (
      <div>
        {/*<NavbarComponent findArticlesByTitle={this.props.findArticlesByTitle}/>*/}
        <div className="sticky-box">
          {
            this.state.isAuthor &&
            <button type="button" className="btn btn-success float-left"
                    onClick={() => this.props.addArticle(this.state.userId)}>
              Add Article
            </button>
          }
        </div>
        <ArticleGridComponent articles={this.props.articles}
                              userId={this.state.userId}
                              deleteArticle={this.props.deleteArticle}/>
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
  findArticlesByAuthor: (userId) => {
    articleService.findArticlesByAuthor(userId)
      .then(articles => dispatch({type: FETCH_ARTICLES, articles}))
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
})


export default connect
(stateToPropertyMapper, propertyToDispatchMapper)
(ArticlePageContainer)
