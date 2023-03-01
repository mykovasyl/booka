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
      <Link to='/'>Home</Link>
      {currentUser.id ? (
        <>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText>
                <Link to='/'>Home</Link>
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText>
                <Link to='/randomrecipe'>Random Recipe</Link>
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText>
                <Link to='/recipebook'>Your Recipe Book</Link>
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText>
                <Link to='/recipeform'>Add Recipe</Link>
              </ListItemText>
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
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText>
                <Link to='/login'>Log In</Link>
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
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
