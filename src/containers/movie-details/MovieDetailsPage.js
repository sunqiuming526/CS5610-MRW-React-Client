import React, {Component} from "react";
import {Button, Container, Figure} from "react-bootstrap";
import FigureCaption from "react-bootstrap/esm/FigureCaption";
import {connect} from "react-redux";
import CommentSectionComponent from "../../components/comment/CommentSectionComponent";
import CastsComponent from "../../components/movie-details/CastsComponent";
import {FETCH_MOVIE} from "../../reducers/ReducerTypes";
import ImdbService from "../../services/ImdbService";
import {getPosterFullUrl, IMAGE_SIZE} from "../../services/utils";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHeart} from "@fortawesome/free-regular-svg-icons/faHeart";
import {faHeart as faHeartSolid} from "@fortawesome/free-solid-svg-icons/faHeart";
import watchlistService from "../../services/WatchlistService";
import axios from "axios";
import {ACCESS_TOKEN_NAME, API_BASE_URL} from "../../constants/ApiConstants";

class MovieDetailsPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isWatchlist: false,
      loginUser: this.props.loginUser,
      movie: this.props.movie
    };
  }

  componentDidMount() {
    const params = this.props.match.params;
    if (params.movieID) {
      this.props.fetchMovieByID(params.movieID);
    }
    let loginUser;
    axios.get(API_BASE_URL + '/users/me', {headers: {'token': localStorage.getItem(ACCESS_TOKEN_NAME)}})
      .then((response) => {
        loginUser = response.data
        console.log(loginUser)
        this.setState(prev => ({
          ...prev,
          loginUser: response.data,
          isWatchlist: loginUser.watchlist.includes(params.movieID)
        }))
      })
      .catch(function (error) {
        console.log(error)
      });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const movieID = this.props.match.movieID;
    if (movieID !== prevProps.match.movieID) {
      this.props.fetchMovieByID(movieID);
    }
  }

  addWatchlist = (movieId) => {
    this.setState(prev => ({...prev, isWatchlist: true}))
    watchlistService.addMovieToWatchlist(this.state.loginUser._id, movieId)

  }

  removeWatchlist = (movieId) => {

    this.setState(prev => ({...prev, isWatchlist: false}))
    watchlistService.removeMovieFromWatchlist(this.state.loginUser._id, movieId)
  }

  render() {
    const movie = this.props.movie;
    const loginUser = this.props.loginUser

    return (
      <Container>
        <h1 className="display-1 font-weight-bold">{movie.title || "Title"}</h1>
        <h3>
          <small className="text-muted">
            Rating: {movie.vote_average || -1} | {movie.genre} (
            {movie.release_date || "Unknown"})
          </small>
        </h3>
        {
          this.state.isWatchlist &&
          <Button onClick={() => this.removeWatchlist(movie.id)}>
            <FontAwesomeIcon icon={faHeartSolid}/>
          </Button>
        }
        {
          !this.state.isWatchlist &&
          <Button onClick={() => this.addWatchlist(movie.id)}>
            <FontAwesomeIcon icon={faHeart}/>
          </Button>
        }
        <div className="col-md-12">
          <Figure>
            <img
              src={getPosterFullUrl(IMAGE_SIZE.lg, movie.poster_path)}
              className="figure-img img-fluid rounded"
              alt="A generic square placeholder image with rounded corners in a figure."
            />
            <FigureCaption placeholder="tagline">{movie.tagline}</FigureCaption>
          </Figure>
          <p className="text-justify">{movie.overview || "Description"}</p>
        </div>
        <hr/>
        <CastsComponent casts={movie.casts || []}/>
        <hr/>
        <CommentSectionComponent curUser={this.state.loginUser}/>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    movie: state.movieReducer.movie,
    loginUser: state.navBarReducer.loginUser
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMovieByID: (movieID) =>
      ImdbService.fetchMovieByID(movieID).then((movie) =>
        dispatch({type: FETCH_MOVIE, movie})
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetailsPage);
