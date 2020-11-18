import React, {useEffect, useState} from 'react'
import {Button, Form, FormControl, FormGroup, FormLabel} from 'react-bootstrap'
import axios from "axios";
import {ACCESS_TOKEN_NAME, API_BASE_URL} from "../../constants/ApiConstants";
import {Link} from "react-router-dom";

const PostCommentCompoent = () => {
  const [user, setUser] = useState({username: ''});

  useEffect(() => {
    axios.get(API_BASE_URL + '/user/me', {headers: {'token': localStorage.getItem(ACCESS_TOKEN_NAME)}})
      .then(function (response) {
        if (response.status == 200) {
          setUser(response.data)
        }
      })
      .catch(function (error) {
        console.log(error)
      });
  }, [])
  return (
    <Form>
      <FormGroup>
        <FormLabel htmlFor="comment" className="float-left">Your Comment</FormLabel>
        {
          user.username &&
          <FormControl name="comment" as="textarea" rows="3"></FormControl>
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
        <Button type="submit" variant="outline-primary" className="float-left">Send</Button>
      }

    </Form>
  )
}

export default PostCommentCompoent;
