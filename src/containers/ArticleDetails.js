import React from "react";
import {connect} from "react-redux";
import articleService from "../services/articleService";
import {FETCH_ARTICLE_BY_ID, FETCH_ARTICLES, ON_CHANGE, UPDATE_ARTICLE} from "../reducers/ReducerTypes";
import "./ArticleDetail.css"

class ArticleDetailsComponent extends React.Component {
  state = {
    isAuthor: false,
    userId: "",
    articleId: "",
    authorId: "",
    editing: false
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.state.articleId = this.props.match.params.articleId;
    this.props.findArticleById(this.state.articleId)
      .then(() => {
        this.state.userId = this.props.match.params.userId;
        this.setState(prev => ({...prev, authorId: this.props.article.authorId}))

        if (this.props.match.params.userId === this.props.article.authorId) {
          this.setState({isAuthor: true})
        }
      });
  }

  render() {
    return <div className="inputBox">
      <div className="sticky-box">
        {
          !this.state.editing && this.state.isAuthor &&
          <button type="button" className="btn btn-success float-left"
            //onClick={() => this.props.edit(this.props.article)}>
                  onClick={() => this.setState({editing: true})}>
            Edit
          </button>
        }
        {
          this.state.editing &&
          <button type="button" className="btn btn-primary float-left"
                  onClick={() => {
                    articleService.updateArticle(this.props.article._id, this.props.article)
                      .then(status => this.setState({editing: false}))
                  }}>
            Save
          </button>
        }
      </div>
      {
        !this.state.editing &&
        <h1>{this.props.article.title}</h1>
      }
      {
        !this.state.editing &&
        <p>{this.props.article.text}</p>
      }
      {
        this.state.editing &&
        <input className="form-control inner-box-margin" placeholder="Please input the article title"
          // onChange={(event) =>
          //     this.setState(preState => ({
          //     article:{...preState.article, title: event.target.value}
          // }))}
               onChange={(event) =>
                 this.props.updateOnchange({
                   ...this.props.article,
                   title: event.target.value
                 })}
               value={this.props.article.title}/>

      }
      {
        this.state.editing &&
        <textarea className="form-control" id="text-content" rows="20"
                  placeholder="Please input the article text"
                  onChange={(event) =>
                    this.props.updateOnchange({
                      ...this.props.article,
                      text: event.target.value
                    })}
                  value={this.props.article.text}>
                    </textarea>
      }

    </div>;
  }
}

const stateToPropertyMapper = (state) => ({
  article: state.articleReducer.article,
});

const propertyToDispatchMapper = (dispatch) => ({

  findArticleById: (articleId) => {
    return articleService.findArticleById(articleId)
      .then((article) => {
        dispatch({type: FETCH_ARTICLE_BY_ID, article})
      });
  },

  updateOnchange: (article) => dispatch({
    type: ON_CHANGE,
    article: article
  }),

});

export default connect
(stateToPropertyMapper, propertyToDispatchMapper)
(ArticleDetailsComponent);
