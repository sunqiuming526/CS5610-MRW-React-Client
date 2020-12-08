import React from "react";
import { getPosterFullUrl, IMAGE_SIZE } from "../../services/utils";

const CastFigureComponent = ({ cast }) => {
  return (
    <figure class="figure">
      <img
        src={getPosterFullUrl(IMAGE_SIZE.sm, cast.profile_path)}
        class="figure-img img-fluid rounded"
        alt={cast.name}
      />
      <figcaption class="figure-caption"><strong>{cast.name}</strong></figcaption>
      <figcaption class="figure-caption">{cast.character}</figcaption>
    </figure>
  );
};

export default CastFigureComponent;
