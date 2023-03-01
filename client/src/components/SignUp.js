import { Button } from "@mui/material";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
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
          // setAvatar(user.image_url);
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
      <h2
        style={{
          border: ".5px solid grey",
          marginBottom: "24px",
          borderRadius: "8px",
          padding: "8px",
        }}
      >
        Join now and get cooking!
      </h2>
      <form onSubmit={handleSubmit}>
        <p>Username</p>
        <input
          name='username'
          type='username'
          value={signupForm.username}
          onChange={handleInputChange}
        />

        <p>Password</p>
        <input
          name='password'
          type='password'
          value={signupForm.password}
          onChange={handleInputChange}
        />
        <p>
          Your password must be 8-20 characters long, contain letters and
          numbers, and must not contain spaces, special characters, or emoji.
        </p>

        <p>Confirm password</p>
        <input
          name='password_confirmation'
          type='password'
          value={signupForm.password_confirmation}
          onChange={handleInputChange}
        />

        <p>Name</p>
        <input
          name='name'
          type='name'
          value={signupForm.name}
          onChange={handleInputChange}
        />

        <p>Upload an avatar (optional):</p>
        <input name='avatar' type='file' onChange={handleFileChange} />

        <Button type='submit' variant='contained'>
          Sign up!
        </Button>
        {/* {error.map((err) => {
            return <h4>{err}</h4>;
          })} */}
      </form>
    </div>
  );
}

export default SignUp;
