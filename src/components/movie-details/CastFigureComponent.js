import React from "react";
import {getPosterFullUrl, IMAGE_SIZE} from "../../services/utils";

const CastFigureComponent = ({cast}) => {
  return (
    <figure className="figure">
      <img
        src={getPosterFullUrl(IMAGE_SIZE.sm, cast.profile_path)}
        className="figure-img img-fluid rounded"
        alt={cast.name}
      />
      <figcaption className="figure-caption">{cast.character}</figcaption>
    </figure>
  );
};

export default CastFigureComponent;
