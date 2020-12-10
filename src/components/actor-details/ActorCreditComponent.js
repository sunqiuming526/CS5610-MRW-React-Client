import React from "react";
import { Image, Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getPosterFullUrl, IMAGE_SIZE } from "../../services/utils";

const placeholderImg = "http://via.placeholder.com/92x128";

const hasImage = (credit) => {
  return (credit.poster_path || credit.backdrop_path) != null;
};

const ActorCreditComponent = ({ credit }) => {
  return (
    <Media className="mb-4">
      <Link to={`/movies/${credit.id}`}>
        <Image
          className="mr-3"
          src={
            hasImage(credit)
              ? getPosterFullUrl(
                  IMAGE_SIZE.xs,
                  credit.poster_path || credit.backdrop_path
                )
              : placeholderImg
          }
        />
      </Link>
      <Media.Body className="text-left">
        <h5 className="mt-0" className="text-left">
          {credit.title || credit.original_name}
        </h5>
        {credit.overview}
      </Media.Body>
    </Media>
  );
};

export default ActorCreditComponent;
