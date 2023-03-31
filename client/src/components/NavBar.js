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
  return (
    <List>
      {currentUser.id ? (
        <>
          <ListItem disablePadding as={Link} to='/'>
            <ListItemButton>
              <ListItemText>Home</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding as={Link} to='/randomrecipe'>
            <ListItemButton>
              <ListItemText>Random Recipe</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding as={Link} to='/recipebook'>
            <ListItemButton>
              <ListItemText>Your Recipe Book</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding as={Link} to='/recipeform'>
            <ListItemButton>
              <ListItemText>Add Recipe</ListItemText>
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText>
                <Button variant='contained' onClick={handleLogOut}>
                  Log out
                </Button>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        </>
      ) : (
        <>
          <ListItem disablePadding as={Link} to='/randomrecipe'>
            <ListItemButton>
              <ListItemText>
                <Link to='/login'>Log In</Link>
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding as={Link} to='/randomrecipe'>
            <ListItemButton>
              <ListItemText>
                <Link to='/signup'>Sign Up</Link>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        </>
      )}
    </List>
  );
}

export default NavBar;
