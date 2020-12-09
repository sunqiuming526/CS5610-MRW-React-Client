import React from "react";
import { Figure, ListGroup, ListGroupItem } from "react-bootstrap";
import { getPosterFullUrl, IMAGE_SIZE } from "../../services/utils";

const decodeGender = (num) => {
  switch (num) {
    case 1:
      return "Female";
    case 2:
      return "Male";
    default:
      return "Unknown";
  }
};

const ActorInfoField = ({ fieldName, fieldContent }) => {
  return (
    <ListGroupItem>
      <h6 className="text-left">
        <strong>{fieldName}</strong>
      </h6>
      <p className="text-left">{fieldContent}</p>
    </ListGroupItem>
  );
};

const ActorBioComponent = ({ actorDetails }) => {
  return (
    <div>
      <h3 className="text-left mb-4">
        <strong>Info</strong>
      </h3>
      <Figure>
        <Figure.Image
          alt="171x180"
          src={getPosterFullUrl(IMAGE_SIZE.lg, actorDetails.profile_path)}
          fluid
          rounded
        />
      </Figure>
      <ListGroup variant="flush">
        <ActorInfoField
          fieldName="Known For"
          fieldContent={actorDetails.known_for_department}
        />
        <ActorInfoField
          fieldName="Gender"
          fieldContent={decodeGender(actorDetails.gender)}
        />
        <ActorInfoField
          fieldName="Birthday"
          fieldContent={actorDetails.birthday}
        />
        {actorDetails.deathdate && (
          <ActorInfoField
            fieldName="Day of Death"
            fieldContent={actorDetails.deathday}
          />
        )}
        {actorDetails.place_of_birth && (
          <ActorInfoField
            fieldName="Place of Birth"
            fieldContent={actorDetails.place_of_birth}
          />
        )}
        {actorDetails.homepage && (
          <ActorInfoField
            fieldName="Homepage"
            fieldContent={actorDetails.homepage}
          />
        )}
        {actorDetails.also_known_as && (
          <ActorInfoField
            fieldName="Also Known as"
            fieldContent={actorDetails.also_known_as.join(" • ")}
          />
        )}
      </ListGroup>
    </div>
  );
};

export default ActorBioComponent;
