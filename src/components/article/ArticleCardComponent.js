import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import articleImage from '../../image/article.jpg'

const ArticleCardComponent = ({article}) =>{
    return (
        <Card style={{ width: "18rem" }} className="m-4" border="primary">
            <Card.Img variant="top" src={articleImage} alt="Logo" />
            <Card.Body>
                <Card.Title>{article.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    Default Author
                </Card.Subtitle>
                <Link to={`/articles/${article._id}`}>
                    <Button variant="primary">Details</Button>
                </Link>
            </Card.Body>
        </Card>
    );
};


export default ArticleCardComponent;
