import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import ActorBioComponent from "../../components/actor-details/ActorBioComponent";
import ActorBiographyComponent from "../../components/actor-details/ActorBiographyComponent";
import ActorCreditsComponent from "../../components/actor-details/ActorCreditsComponent";
import ActorPhotosComponent from "../../components/actor-details/ActorPhotosComponent";
import { FETCH_ACTOR } from "../../reducers/ReducerTypes";
import ImdbService from "../../services/ImdbService";

class ActorDetailsPage extends Component {
  componentDidMount() {
    const params = this.props.match.params;
    if (params.actorID) {
      this.props.fetchActorByID(params.actorID);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const actorID = this.props.match.actorID;
    if (actorID !== prevProps.match.actorID) {
      this.props.fetchActorByID(actorID);
    }
  }

  render() {
    return (
      <Container>
        <h1 className="text-left mt-4 display-1" style={{fontWeight: 800}}>
          <strong>{this.props.actorDetails.name}</strong>
        </h1>
        <Row className="mt-4">
          <Col md={3}>
            <ActorBioComponent actorDetails={this.props.actorDetails} />
          </Col>
          <Col md={9}>
            <ActorBiographyComponent
              name={this.props.actorDetails.name}
              biography={this.props.actorDetails.biography}
            />
            <ActorPhotosComponent
              photoUrls={(this.props.actorDetails.photos || []).map(
                (p) => p.file_path
              )}
            />
            <ActorCreditsComponent credits={this.props.actorDetails.credits} />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return { actorDetails: state.actorReducer.actor };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchActorByID: (actorID) =>
      ImdbService.fetchActorByID(actorID).then((actorDetails) =>
        dispatch({
          type: FETCH_ACTOR,
          actor: actorDetails,
        })
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActorDetailsPage);
