import React, { Component } from "react";
import { Container, Figure } from "react-bootstrap";
import FigureCaption from "react-bootstrap/esm/FigureCaption";
import { connect } from "react-redux";
import CommentSectionComponent from "../../components/comment/CommentSectionComponent";
import CastsComponent from "../../components/movie-details/CastsComponent";
import { FETCH_MOVIE } from "../../reducers/ReducerTypes";
import ImdbService from "../../services/ImdbService";
import { getPosterFullUrl, IMAGE_SIZE } from "../../services/utils";

class MovieDetailsPage extends Component {
  componentDidMount() {
    const params = this.props.match.params;
    if (params.movieID) {
      this.props.fetchMovieByID(params.movieID);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const movieID = this.props.match.movieID;
    if (movieID !== prevProps.match.movieID) {
      this.props.fetchMovieByID(movieID);
    }
  }

  render() {
    const movie = this.props.movie;
    return (
      <Container>
        <h1 className="display-1"><strong>{movie.title || "Title"}</strong></h1>
        <h3>
          <small className="text-muted">
            Rating: {movie.vote_average || -1} | {movie.genre} (
            {movie.release_date || "Unknown"})
          </small>
        </h3>
        <div className="col-md-12">
          <Figure>
            <img
              src={getPosterFullUrl(IMAGE_SIZE.original, movie.poster_path)}
              className="figure-img img-fluid rounded"
              alt="A generic square placeholder image with rounded corners in a figure."
            />
            <FigureCaption placeholder="tagline">{movie.tagline}</FigureCaption>
          </Figure>
          <p className="text-justify">{movie.overview || "Description"}</p>
        </div>
        <hr />
        <CastsComponent casts={movie.casts || []} />
        <hr />
        <CommentSectionComponent />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    movie: state.movieReducer.movie,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMovieByID: (movieID) =>
      ImdbService.fetchMovieByID(movieID).then((movie) =>
        dispatch({ type: FETCH_MOVIE, movie })
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetailsPage);
