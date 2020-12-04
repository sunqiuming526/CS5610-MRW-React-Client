import {Col, Container, FormControl, Row} from "react-bootstrap";
import CurrentCommentsComponent from "./CurrentCommentsComponent";
import PostCommentCompoent from "./PostCommentComponent";
import {useEffect, useState} from "react";
import commentService from "../../services/CommentService";
import {useParams} from "react-router-dom";

const CommentSectionComponent = ({curUser}) => {
  const [comments, setComments] = useState([]);
  const movieId = useParams()["movieID"];

  useEffect(() => {
    commentService.getCommentsForMovie(movieId).then(res => {
      setComments(res)
    })
  }, [])

  const editComment = (newComment) => {
    setComments(comments.map(comment => comment._id === newComment ? newComment : comment))
  }
  return (
    <div>

      <Row>
        <Col>
          <h3 className="float-left">Comments</h3>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <PostCommentCompoent/>
        </Col>
      </Row>

      {
        comments.map(comment =>
          <div key={comment._id} id={comment._id}>
            <Row>
              <Col>
                {comment._id}
                {/*<CurrentCommentsComponent user={comment.userId[0]} comment={comment} updateCommentState={editComment}>*/}
                <CurrentCommentsComponent user={curUser} comment={comment} updateCommentState={editComment}>
                  {!comment.editing &&
                  <p className="text-justify">
                    {comment.text}
                  </p>
                  }
                  {
                    comment.editing &&
                    <FormControl value={comment.text}
                                 onChange={(event) => {
                                   comment.text = event.target.value
                                   editComment(comment)
                                 }}/>
                  }
                </CurrentCommentsComponent>
              </Col>
            </Row>
          </div>
        )
      }

    </div>
  );
};

export default CommentSectionComponent;
