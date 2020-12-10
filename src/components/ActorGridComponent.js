import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getPosterFullUrl, IMAGE_SIZE } from "../services/utils";

const placeholderImg = "http://via.placeholder.com/154x231";

const ActorCardComponent = ({ actor }) => {
  return (
    <Card className="m-0" border="primary">
      <Link to={`/actors/${actor.id}`}>
        <Card.Img
          variant="top"
          src={
            actor.profile_path
              ? getPosterFullUrl(IMAGE_SIZE.sm, actor.profile_path)
              : placeholderImg
          }
        />
      </Link>
      <Card.Body>
        <Card.Title>{actor.name}</Card.Title>
      </Card.Body>
    </Card>
  );
};

const ActorGridComponent = ({ actors = [] }) => {
  return (
    <Container fluid>
      <Row>
        {actors.map((actor) => (
          <Col xl={2} lg={3} md={4} sm={6} xs={12} key={actor.id}>
            <ActorCardComponent actor={actor} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ActorGridComponent;
