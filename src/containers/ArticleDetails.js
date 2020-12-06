import React from "react";
import { connect } from "react-redux";
import articleService from "../services/articleService";
import {FETCH_ARTICLE_BY_ID, FETCH_ARTICLES, UPDATE_ARTICLE} from "../reducers/ReducerTypes";

class ArticleDetailsComponent extends React.Component {
    state = {
        isAuthor: false,
        userId: "",
        articleId: "",
        article: this.props.article,
        editing: false
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        //console.log('fanqi'+this.state.editing);
        this.state.articleId = this.props.match.params.articleId;
        this.props.findArticleById(this.state.articleId);
        this.state.userId = this.props.match.params.userId;
        if (this.state.userId === this.props.article.authorId) {
            this.state.isAuthor = true;
        }

    }

    render(){
        return<div>
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
                                articleService.updateArticle(this.state.article._id, this.state.article)
                                    .then(status => this.setState({editing: false}))
                            }}>
                        Save
                    </button>
                }
            </div>
            {
                !this.state.editing &&
                <h1>{this.state.article.title}</h1>
            }
            {
                !this.state.editing &&
                <p>{this.state.article.text}</p>
            }
            {
                this.state.editing &&
                <input className="form-control inner-box-margin" placeholder="Please input the article title"
                       onChange={(event) =>
                           this.setState(preState => ({
                           article:{...preState.article, title: event.target.value}
                       }))}
                       value={this.state.article.title}/>

            }
            {
                this.state.editing &&
                    <textarea className="form-control" id="text-content" rows="20"
                              placeholder="Please input the article text"
                              onChange={(event) =>
                                  this.setState(preState => ({
                                      article:{...preState.article, text: event.target.value}
                                  }))}
                              value={this.state.article.text}>
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
        articleService.findArticleById(articleId)
            .then((article) => {
                dispatch({type: FETCH_ARTICLE_BY_ID, article})
            });
    },

});

export default connect
(stateToPropertyMapper, propertyToDispatchMapper)
(ArticleDetailsComponent);
