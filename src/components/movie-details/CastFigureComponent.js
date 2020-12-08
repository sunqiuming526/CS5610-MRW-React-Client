import React from "react";
import { Figure } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getPosterFullUrl, IMAGE_SIZE } from "../../services/utils";

const CastFigureComponent = ({ cast }) => {
  return (
    <Figure>
      <Link to={`/actors/${cast.id}`}>
        <img
          src={getPosterFullUrl(IMAGE_SIZE.sm, cast.profile_path)}
          class="figure-img img-fluid rounded"
          alt={cast.name}
        />
      </Link>
      <Figure.Caption>
        <strong>{cast.name}</strong>
      </Figure.Caption>
      <Figure.Caption class="figure-caption">{cast.character}</Figure.Caption>
    </Figure>
  );
};

export default CastFigureComponent;
