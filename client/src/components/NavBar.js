import React from "react"
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <nav id="navigation" >
      <Link to="/">Home</Link>
      <Link to="/randomrecipe">Random Recipe</Link>
      <Link to="/recipebook">Your Recipe Book</Link>
      <Link to="/recipeform">Add Recipe</Link>
      <Link to="/login">Log In</Link>
      <Link to="/signup">Sign Up</Link>
    </nav>
  )
}

export default NavBar