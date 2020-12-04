import React, {useEffect, useState} from "react";
import axios from "axios";
import {ACCESS_TOKEN_NAME, API_BASE_URL} from "../../constants/ApiConstants";
import commentService from "../../services/CommentService";
import imdbService from "../../services/ImdbService";
import {HashLink} from "react-router-hash-link"

const MyComment = ({user}) => {
  const [comments, setComments] = useState([]);
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    if (user._id) {
      commentService.getCommentsForUser(user._id)
        .then(res => {
          setComments(res)
          setFlag(true)
        })
    }
  }, [user])

  useEffect(() => {
    comments.map(curComment => imdbService.getMovieNameById(curComment.movieId)
      .then(movieName => {
        curComment.movieName = movieName
        setComments(prevState => prevState.map(comment => comment._id === curComment._id ? curComment : comment))
      }))
  }, [flag])

  return (
    <div>
      <h5 className="mb-3">My Comments</h5>
      <div className="col-md-12">
        <table className="table table-sm table-hover table-striped">
          <thead>
          <tr>
            <td>
              Comment
            </td>
            <td>
              Movie
            </td>
          </tr>
          </thead>

          <tbody>
          {
            comments.map(comment =>
              <tr id={comment._id}>
                <td>
                  <strong>{comment.text}</strong>
                </td>
                <td>
                  <HashLink to={`/movies/${comment.movieId}/#${comment._id}`}>
                    {comment.movieName}
                  </HashLink>
                </td>
              </tr>
            )
          }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MyComment
