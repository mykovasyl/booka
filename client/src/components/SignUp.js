import React, { useState, useContext } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./App";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function SignUp() {
  const { setCurrentUser } = useContext(UserContext);
  const theme = createTheme();
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

    fetch("/signup", {
      method: "POST",
      body: formData,
    }).then((resp) => {
      if (resp.ok) {
        resp.json().then((user) => {
          setCurrentUser(user);
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

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component='h1' variant='h5'>
            Join now and get cooking!
          </Typography>
          <Box
            component='form'
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete='given-name'
                  name='name'
                  required
                  fullWidth
                  label='Full name'
                  value={signupForm.name}
                  onChange={handleInputChange}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label='Username'
                  name='username'
                  autoComplete='username'
                  value={signupForm.username}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  autoComplete='new-password'
                  value={signupForm.password}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label='Confirm Password'
                  name='password_confirmation'
                  type='password'
                  autoComplete='confirm-password'
                  value={signupForm.password_confirmation}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignUp;
