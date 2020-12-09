import React from "react";
import { Col, Row } from "react-bootstrap";
import CastFigureComponent from "./CastFigureComponent";

const CastsComponent = ({ casts }) => {
  return (
    <div>
      <Row>
        <Col>
          <h3 className="float-left">Casts</h3>
        </Col>
      </Row>
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
