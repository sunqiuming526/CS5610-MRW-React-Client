import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import MovieCardComponent from "./MovieCardComponent";

const MovieGridComponent = ({ movies }) => {
  return (
    <Container fluid>
      <div className="row">
        {movies.map(({ id, title, rating, posterUrl, releaseYear }) => (
          <Row>
            <Col xl={2} lg={3} md={4} sm={6} xs={12}>
              <MovieCardComponent
                id={id}
                title={title}
                rating={rating}
                posterUrl={posterUrl}
                releaseYear={releaseYear}
              />
            </Col>
          </Row>
        ))}
      </div>
    </Container>
  );
};

export default MovieGridComponent;