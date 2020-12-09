import React, {useEffect, useState} from 'react'
import {Button, Form, FormControl, FormGroup, FormLabel} from 'react-bootstrap'
import axios from "axios";
import {ACCESS_TOKEN_NAME, API_BASE_URL, API_USERS_URL} from "../../constants/ApiConstants";
import {Link, useParams} from "react-router-dom";
import commentService, {getCommentsForMovie} from "../../services/CommentService";

const PostCommentCompoent = () => {
  const [user, setUser] = useState({username: ''});
  const [text, setText] = useState('');
  const movieId = useParams()["movieID"];

  useEffect(() => {
    axios.get(API_USERS_URL + '/me', {headers: {'token': localStorage.getItem(ACCESS_TOKEN_NAME)}})
      .then(function (response) {
        if (response.status == 200) {
          setUser(response.data)
        }
      })
      .catch(function (error) {
        console.log(error)
      });
  }, [])


  const handleSendComment = (movieId) => {
    const newComment = {
      movieId,
      text,
      "userId": user._id
    }
    commentService.addCommentForMovie(newComment)
  }

  return (
    <Form>
      <FormGroup>
        <FormLabel htmlFor="comment" className="float-left">Your Comment</FormLabel>
        {
          user.username &&
          <FormControl name="comment" as="textarea" rows="3"
                       onChange={(event) => {
                         setText(event.target.value)
                       }}/>
        }
        {
          !user.username &&
          <div>
            Please
            <Link to={"/login"}> Log in </Link>
            to comment.
          </div>
        }
      </FormGroup>
      {
        user.username &&
        <Button type="submit" variant="outline-primary" className="float-left"
                onClick={() => {
                  handleSendComment(movieId)
                }}>
          Send
        </Button>
      }

    </Form>
  )
}

export default PostCommentCompoent;
