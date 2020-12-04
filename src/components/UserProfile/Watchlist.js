import React, {useEffect, useState} from "react";
import {Card, Col, Container, Row} from "react-bootstrap";
import imdbService from "../../services/ImdbService";
import MovieCardComponent from "../MovieCardComponent";
import MovieGridComponent from "../MovieGridComponent";

const Watchlist = ({user}) => {

  const [movies, setMovies] = useState([])

  useEffect(() => {
    let movieList = []
    let promises = []
    console.log(user.watchlist)
    try {
      if (user.watchlist) {
        for (const movieId of user.watchlist) {
          promises.push(imdbService.fetchMovieByID(movieId).then(res => {
            if (res.success !== false)
              movieList.push(res)
          }))
        }
        Promise.all(promises).then(res => setMovies(movieList))
      }

    } catch (e) {
      console.log(e)
    }

  }, [user])

  return (
    <div>
      <h5 className="mb-3">Watchlist</h5>
      <Row>
        <MovieGridComponent movies={movies}/>
      </Row>
    </div>
  )
}

export default Watchlist
