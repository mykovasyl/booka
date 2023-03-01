import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./App";
import Button from "@mui/material/Button";

function NavBar() {
  const { currentUser, handleLogOut } = useContext(UserContext);
  return (
    <nav id='navigation'>
      <Link to='/'>Home</Link>
      {currentUser.id ? (
        <>
          <Link to='/randomrecipe'>Random Recipe</Link>
          <Link to='/recipebook'>Your Recipe Book</Link>
          <Link to='/recipeform'>Add Recipe</Link>
          <Button variant='contained' onClick={handleLogOut}>
            Log out
          </Button>
        </>
      ) : (
        <>
          <Link to='/login'>Log In</Link>
          <Link to='/signup'>Sign Up</Link>
        </>
      )}
    </nav>
  );
}

export default NavBar;
