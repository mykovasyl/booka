import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./App";
import Button from "@mui/material/Button";

function LogIn() {
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  const { setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  function handleInputChange(e) {
    setLogin({ ...login, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(login),
    }).then((resp) => {
      if (resp.ok) {
        resp.json().then((loggedInUser) => {
          setCurrentUser(loggedInUser);
          navigate("/");
        });
      } else {
        alert("Invalid username or password");
      }
    });
  }

  return (
    <>
      <h2
        style={{
          border: ".5px solid grey",
          marginBottom: "24px",
          borderRadius: "8px",
          padding: "8px",
        }}
      >
        Log in:
      </h2>
      <form onSubmit={handleSubmit}>
        <p>Username:</p>
        <input
          type='text'
          name='username'
          value={login.username}
          onChange={handleInputChange}
        />

        <p>Password:</p>
        <input
          type='password'
          name='password'
          value={login.password}
          onChange={handleInputChange}
        />

        <Button type='submit' variant='contained' style={{ margin: "16px" }}>
          Log in!
        </Button>
      </form>
    </>
  );
}

export default LogIn;
