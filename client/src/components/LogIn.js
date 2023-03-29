import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./App";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function LogIn() {
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  const theme = createTheme();
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
            Sign in
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin='normal'
              required
              fullWidth
              label='Username'
              name='username'
              autoComplete='username'
              value={login.username}
              onChange={handleInputChange}
              autoFocus
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              value={login.password}
              onChange={handleInputChange}
              autoComplete='current-password'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default LogIn;
