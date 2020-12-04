import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import articleImage from '../../image/article.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrash} from "@fortawesome/free-solid-svg-icons";

class ArticleCardComponent extends React.Component{
    constructor(props) { //{article, userId, deleteArticle}
        super(props);
    }

    render(){
        return (
            <Card style={{ width: "18rem" }} className="m-4" border="primary">
                <Card.Img variant="top" src={articleImage} alt="Logo" />
                <Card.Body>
                    <Card.Title>{this.props.article.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                        Default Author
                    </Card.Subtitle>
                    <Link to={`/articles/${this.props.article._id}`}>
                        <Button variant="primary">Details</Button>
                    </Link>
                    {
                        this.props.userId === this.props.article.authorId &&
                        <button className="float-right"
                           onClick={()=> this.props.deleteArticle(this.props.article)}>
                            <FontAwesomeIcon icon={faTrash}/>
                        </button>
                    }
                </Card.Body>
            </Card>
        );
    }
}


export default ArticleCardComponent;
