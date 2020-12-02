import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import ArticleCardComponent from "./ArticleCardComponent";

const ArticleGridComponent = ({articles}) => {
    return (
        <Container fluid>
            <Row>
                {articles.map(({id, title, author}) => (
                    <Col xl={2} lg={3} md={4} sm={6} xs={12}>
                        <ArticleCardComponent
                            id={id}
                            title={title}
                            author={author}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default ArticleGridComponent;
