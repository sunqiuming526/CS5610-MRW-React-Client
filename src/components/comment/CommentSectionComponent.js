import { Col, Container, Row } from "react-bootstrap";
import CurrentCommentsComponent from "./CurrentCommentsComponent";
import PostCommentCompoent from "./PostCommentComponent";

const CommentSectionComponent = ({}) => {
  return (
    <div>
      <Row>
        <Col>
          <h3 className="float-left">Comments</h3>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <PostCommentCompoent />
        </Col>
      </Row>
      <Row>
        <Col>
          <CurrentCommentsComponent user={{ name: "Bob" }}>
            <p className="text-justify">
              This series starts off like some of the best out there. Although
              it makes some minor adjustments, it follows the story from the
              books quite faithfully for the first 4 seasons. And adds a twinkle
              of big budget movies, and great cinematography. Truly awesome. Up
              until this point, I was in love with the series, a 10/10. I
              quickly read all the books, and re-watched all seasons before a
              new one would come out. However, from season 5 and onwards, it
              starts going downhill. They ran out of book-material, and it
              shows. Everything starts focusing on the big set-pieces,
              characters become extremely blan... read the rest.
            </p>

            <CurrentCommentsComponent user={{ name: "Jay" }}>
              <p className="text-justify">
                I admit that I never saw the whole series. That said, on January
                last year I decided to binge watch all of it. First 10 minutes
                of the first episode left me in awe and as I kept watching I
                finally understood why everybody loved it. Each episode left me
                in shock and awe. From shocking character deaths to epic battle
                scenes. Some of the characters I loved, while a few I hated and
                glad they finally died. Series 8, as I've finally catched up. I
                was honestly left disappointed with the ending - and I'd hoped
                they would save the Nightwalker battle for the last two
                episodes. Nevertheless, this ser... read the rest.
              </p>
            </CurrentCommentsComponent>
          </CurrentCommentsComponent>
          <CurrentCommentsComponent user={{ name: "Bob" }}>
            <p className="text-justify">
              This series starts off like some of the best out there. Although
              it makes some minor adjustments, it follows the story from the
              books quite faithfully for the first 4 seasons. And adds a twinkle
              of big budget movies, and great cinematography. Truly awesome. Up
              until this point, I was in love with the series, a 10/10. I
              quickly read all the books, and re-watched all seasons before a
              new one would come out. However, from season 5 and onwards, it
              starts going downhill. They ran out of book-material, and it
              shows. Everything starts focusing on the big set-pieces,
              characters become extremely blan... read the rest.
            </p>

            <CurrentCommentsComponent user={{ name: "Jay" }}>
              <p className="text-justify">
                I admit that I never saw the whole series. That said, on January
                last year I decided to binge watch all of it. First 10 minutes
                of the first episode left me in awe and as I kept watching I
                finally understood why everybody loved it. Each episode left me
                in shock and awe. From shocking character deaths to epic battle
                scenes. Some of the characters I loved, while a few I hated and
                glad they finally died. Series 8, as I've finally catched up. I
                was honestly left disappointed with the ending - and I'd hoped
                they would save the Nightwalker battle for the last two
                episodes. Nevertheless, this ser... read the rest.
              </p>

              <CurrentCommentsComponent user={{ name: "Jay" }}>
                <p className="text-justify">
                  I admit that I never saw the whole series. That said, on
                  January last year I decided to binge watch all of it. First 10
                  minutes of the first episode left me in awe and as I kept
                  watching I finally understood why everybody loved it. Each
                  episode left me in shock and awe. From shocking character
                  deaths to epic battle scenes. Some of the characters I loved,
                  while a few I hated and glad they finally died. Series 8, as
                  I've finally catched up. I was honestly left disappointed with
                  the ending - and I'd hoped they would save the Nightwalker
                  battle for the last two episodes. Nevertheless, this ser...
                  read the rest.
                </p>
              </CurrentCommentsComponent>
            </CurrentCommentsComponent>
          </CurrentCommentsComponent>
        </Col>
      </Row>
    </div>
  );
};

export default CommentSectionComponent;
