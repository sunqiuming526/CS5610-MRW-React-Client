import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import articleImage from '../../image/article.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrash} from "@fortawesome/free-solid-svg-icons";

class ArticleCardComponent extends React.Component{
    constructor(props) { //{article, userId, deleteArticle}
        super(props);
    }

    render(){
        return (
            <Card className="m-0" border="primary">
                <Card.Img variant="top" src={articleImage} alt="Logo" />
                <Card.Body>
                    <Card.Title>{this.props.article.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                        Default Author
                    </Card.Subtitle>
                    {
                        this.props.userId === this.props.article.authorId &&
                        <Link to={`/${this.props.userId}/articles/${this.props.article._id}`}>
                            <Button variant="primary">Details</Button>
                        </Link>
                    }
                    {
                        this.props.userId !== this.props.article.authorId &&
                        <Link to={`/articles/${this.props.article._id}`}>
                            <Button variant="primary">Details</Button>
                        </Link>
                    }

                    {
                        this.props.userId === this.props.article.authorId &&
                        <i className="float-right"
                           onClick={()=> {
                               return this.props.deleteArticle(this.props.article)
                           }}>
                            <FontAwesomeIcon icon={faTrash}/>
                        </i>
                    }
                </Card.Body>
            </Card>
        );
    }
}


export default ArticleCardComponent;
