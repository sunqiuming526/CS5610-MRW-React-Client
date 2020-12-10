import React from "react";

const ActorBiographyComponent = ({ name, biography }) => {
  return (
    <div>
      <h3 className="text-left mb-4">
        <strong>Biography</strong>
      </h3>
      <p className="text-left">
        {biography}
      </p>
    </div>
  );
};

export default ActorBiographyComponent;
