import React from "react";
import { Col, Figure, Row } from "react-bootstrap";
import { getPosterFullUrl, IMAGE_SIZE } from "../../services/utils";

const ActorPhotosComponent = ({ photoUrls }) => {
  return (
    <Row className="mb-4">
      <Col>
        <Row className="mb-3">
          <Col>
            <h3 className="float-left">
              <strong>Photos</strong>
            </h3>
          </Col>
        </Row>
        <Row style={{ height: "300px", overflowY: "auto" }}>
          {photoUrls.map((photoUrl) => {
            return (
              <Col
                xl={3}
                lg={4}
                md={6}
                sm={12}
                xs={12}
                key={photoUrl.substr(1)}
              >
                <Figure>
                  <Figure.Image
                    src={getPosterFullUrl(IMAGE_SIZE.sm, photoUrl)}
                    fluid
                    rounded
                  />
                </Figure>
              </Col>
            );
          })}
        </Row>
      </Col>
    </Row>
  );
};

export default ActorPhotosComponent;
