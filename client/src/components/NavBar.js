import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./App";
import Button from "@mui/material/Button";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

function NavBar() {
  const { currentUser, handleLogOut } = useContext(UserContext);
  const buttonStyle = { color: "#A52A2A" };
  const boldText = { fontWeight: "bold" };
  return (
    <List>
      {currentUser.id ? (
        <>
          <ListItem disablePadding as={Link} to='/'>
            <ListItemButton sx={buttonStyle}>
              <ListItemText>
                <div style={boldText}>Home</div>
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding as={Link} to='/randomrecipe'>
            <ListItemButton sx={buttonStyle}>
              <ListItemText>
                <div style={boldText}>Random Recipe</div>
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding as={Link} to='/recipebook'>
            <ListItemButton sx={buttonStyle}>
              <ListItemText>
                <div style={boldText}>Your booka</div>
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding as={Link} to='/recipeform'>
            <ListItemButton sx={buttonStyle}>
              <ListItemText>
                <div style={boldText}>Add Recipe</div>
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem sx={{ mt: 1 }}>
            <Button variant='outlined' color='error' onClick={handleLogOut}>
              Log out
            </Button>
          </ListItem>
        </>
      ) : (
        <>
          <ListItem disablePadding as={Link} to='/login'>
            <ListItemButton sx={buttonStyle}>
              <ListItemText>
                <div style={boldText}>Log In</div>
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding as={Link} to='/signup'>
            <ListItemButton sx={buttonStyle}>
              <ListItemText>
                <div style={boldText}>Sign Up</div>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        </>
      )}
    </List>
  );
}

export default NavBar;
