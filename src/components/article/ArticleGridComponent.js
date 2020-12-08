import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import ArticleCardComponent from "./ArticleCardComponent";

const ArticleGridComponent = ({articles, userId, deleteArticle}) => {
    return (
        <Container fluid>
            <Row>
                {articles.map(article => (
                    <Col xl={3} lg={4} md={6} sm={6} xs={12}>
                        <ArticleCardComponent
                            article = {article}
                            userId = {userId}
                            deleteArticle = {deleteArticle}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default ArticleGridComponent;
