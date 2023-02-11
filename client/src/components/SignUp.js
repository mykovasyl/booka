import React, { useState, useContext } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { UserContext } from "./App";

function SignUp() {
  const { setCurrentUser, avatar, setAvatar } = useContext(UserContext);

  const [error, setError] = useState([]);
  const [signupForm, setSignupForm] = useState({
    username: "",
    password: "",
    password_confirmation: "",
    name: "",
  });

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();

    for (let data in signupForm) {
      formData.append(data, signupForm[data]);
    }

    if (avatar !== null) {
      formData.append("avatar", avatar.avatar);
    }

    fetch("/signup", {
      method: "POST",
      body: formData,
    }).then((resp) => {
      if (resp.ok) {
        resp.json().then((user) => {
          setCurrentUser(user);
          setAvatar(user.image_url);
          navigate("/");
        });
      } else {
        resp.json().then((err) => setError(err.errors));
      }
    });
  }

  function handleInputChange(e) {
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
  }

  function handleFileChange(e) {
    setAvatar({ avatar: e.target.files[0] });
  }

  return (
    <div>
      <Container
        style={{
          marginTop: "24px",
          padding: "24px",
          border: ".5px solid grey",
          borderRadius: "8px",
          width: "75%",
        }}
      >
        <h2
          style={{
            border: ".5px solid grey",
            marginBottom: "24px",
            borderRadius: "8px",
            padding: "8px",
          }}
        >
          Join our growing family of tutors and students!
        </h2>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Label>Username</Form.Label>
              <Form.Control
                name='username'
                type='username'
                value={signupForm.username}
                onChange={handleInputChange}
              />
            </Col>
          </Row>
          <Row style={{ marginTop: "16px" }}>
            <Col>
              <Form.Label>Password</Form.Label>
              <Form.Control
                name='password'
                type='password'
                value={signupForm.password}
                onChange={handleInputChange}
              />
              <Form.Text muted>
                Your password must be 8-20 characters long, contain letters and
                numbers, and must not contain spaces, special characters, or
                emoji.
              </Form.Text>
            </Col>
            <Col>
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                name='password_confirmation'
                type='password'
                value={signupForm.password_confirmation}
                onChange={handleInputChange}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Name</Form.Label>
              <Form.Control
                name='name'
                type='name'
                value={signupForm.name}
                onChange={handleInputChange}
              />
            </Col>
          </Row>
          <Row style={{ marginTop: "16px" }}>
            <Col>
              <Form.Label>Upload an avatar (optional):</Form.Label>
              <Form.Control
                name='avatar'
                type='file'
                onChange={handleFileChange}
              />
            </Col>
          </Row>
          <Button type='submit' variant='success'>
            Sign up!
          </Button>
          {/* {error.map((err) => {
            return <h4>{err}</h4>;
          })} */}
        </Form>
      </Container>
    </div>
  );
}

export default SignUp;
