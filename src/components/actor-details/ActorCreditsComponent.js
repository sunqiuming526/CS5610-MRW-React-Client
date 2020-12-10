import React from "react";
import { Col, Row } from "react-bootstrap";
import ActorCreditComponent from "./ActorCreditComponent";

const ActorCreditsComponent = ({ credits = [] }) => {
  return (
    <Row>
      <Col md={12} className="text-left mb-3">
        <h3>
          <strong>Credits</strong>
        </h3>
      </Col>
      <Row style={{ height: "400px", overflowY: "auto"}}>
        {credits.map((c) => (
          <Col md={12}>
            <ActorCreditComponent credit={c} />
          </Col>
        ))}
      </Row>
    </Row>
  );
};

export default ActorCreditsComponent;
