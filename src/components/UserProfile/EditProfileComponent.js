import React, {useState} from "react";
import {Button, Dropdown, Form, FormControl, InputGroup, Row} from "react-bootstrap";
import userService from "../../services/UserService";

const EditProfileComponent = ({user}) => {
  const [username, setUsername] = useState(user.username)
  const [email, setEmail] = useState(user.email)
  const [role, setRole] = useState(user.role)
  const [password, setPassword] = useState('****')

  const submitUpdate = () => {
    userService.updateUser(user._id, {username, email, role, password})
  }

  return (
    <div id="profile">
      <h5 className="mb-3">User Profile</h5>
      <Row className={"align-items-center"}>
        <div className="col-12">
          <h6>Username</h6>
          <FormControl value={username} onChange={(e) => setUsername(e.target.value)}/>
          <h6>Email</h6>
          <FormControl value={email} onChange={(e) => setEmail(e.target.value)}/>
          <h6>Password</h6>
          <FormControl value={password} onChange={(e) => setPassword(e.target.value)}/>
          <h6>Role</h6>
          <Form>
            <Form.Group controlId="exampleForm.SelectCustom">
              <Form.Control as="select" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value={"admin"}>Admin</option>
                <option value={"user"}>User</option>
                <option value={"author"}> Author</option>
              </Form.Control>
            </Form.Group>
          </Form>


          <Button className="m-4" onClick={submitUpdate}>
            Submit
          </Button>
        </div>
      </Row>
    </div>

  )
}

export default EditProfileComponent
