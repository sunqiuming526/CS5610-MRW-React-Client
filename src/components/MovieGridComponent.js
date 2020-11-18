import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { getPosterFullUrl, IMAGE_SIZE } from "../services/utils";
import MovieCardComponent from "./MovieCardComponent";

const MovieGridComponent = ({ movies }) => {
  return (
    <Container fluid>
      <Row>
        {movies.map(({ id, title, vote_average, poster_path, release_date }) => (
          <Col xl={2} lg={3} md={4} sm={6} xs={12}>
            <MovieCardComponent
              id={id}
              title={title}
              rating={vote_average}
              posterUrl={getPosterFullUrl(IMAGE_SIZE.md, poster_path)}
              releaseYear={release_date}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MovieGridComponent;
