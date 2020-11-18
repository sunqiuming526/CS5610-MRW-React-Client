import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import CastFigureComponent from "./CastFigureComponent";

const CastsComponent = ({ casts }) => {
  return (
    <div>
      <h3>Casts</h3>
      <Row>
        {casts
          .filter((cast) => cast.profile_path !== null)
          .map((cast) => {
            return (
              <Col xl={2} lg={3} md={4} sm={6} xs={12} key={cast.id}>
                <CastFigureComponent cast={cast} />
              </Col>
            );
          })}
      </Row>
    </div>
  );
};

export default CastsComponent;
