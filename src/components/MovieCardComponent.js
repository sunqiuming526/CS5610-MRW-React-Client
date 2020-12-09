import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


const MovieCardComponent = ({ id, title, rating, posterUrl, releaseYear }) => {
  return (
    <Card  className="m-0" border="primary">
      <Card.Img variant="top" src={posterUrl} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {releaseYear} - Rating: {rating}
        </Card.Subtitle>
        <Link to={`/movies/${id}`}>
          <Button variant="primary">Details</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default MovieCardComponent;
