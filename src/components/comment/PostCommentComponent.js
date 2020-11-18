import React from 'react'
import { Button, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap'

const PostCommentCompoent = () => {
  return (
    <Form>
      <FormGroup>
        <FormLabel htmlFor="comment" className="float-left">Your Comment</FormLabel>
        <FormControl name="comment" as="textarea" rows="3"></FormControl>
      </FormGroup>
      <Button type="submit" variant="outline-primary" className="float-left">Send</Button>
    </Form>
  )
}

export default PostCommentCompoent;