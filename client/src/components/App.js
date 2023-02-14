import React, { useState, useEffect, createContext } from "react";
import RandomRecipe from "./RandomRecipe";
import RecipeForm from "./RecipeForm";
import RecipeBook from "./RecipeBook";
import NavBar from "./NavBar";
import Home from "./Home";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import { Route, Routes } from "react-router-dom";

export const UserContext = createContext();

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [recipes, setRecipes] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [errors, setErrors] = useState([]);

  // fetch current user else no user logged in
  useEffect(() => {
    fetch("/me").then((resp) => {
      if (resp.ok) {
        resp.json().then((user) => {
          setCurrentUser(user);
          setRecipes([]);
          // setAvatar(user.image_url);
        });
      } else {
        resp.json().then((error) => setErrors(error));
      }
    });
  }, []);

  function handleAddRecipe(recipe) {
    fetch(`/recipes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...recipe, liked: true }),
    })
      .then((resp) => resp.json())
      .then((postedRecipe) => setRecipes([...recipes, postedRecipe]));
  }

  // delete a recipe from your recipe book
  function handleDeleteRecipe(id) {
    const newRecipes = recipes.filter((recipe) => recipe.id !== id);
    fetch(`/recipes/${id}`, {
      method: "DELETE",
    });
    setRecipes(newRecipes);
  }

  // useEffect(() => {
  //   // fetch(`${process.env.REACT_APP_API_URL}/recipes`)
  //   fetch(`/recipes`)
  //     .then((resp) => resp.json())
  //     .then((jsonRecipes) => {
  //       setRecipes(jsonRecipes);
  //     });
  // }, []);

  return (
    <div>
      <UserContext.Provider value={{ currentUser, setCurrentUser, avatar }}>
        <NavBar />
        <Routes>
          <Route
            path='/randomrecipe'
            element={
              <RandomRecipe
                onRecipeLike={handleAddRecipe}
                isLiked={isLiked}
                setIsLiked={setIsLiked}
              />
            }
          />
          <Route
            path='/recipeform'
            element={<RecipeForm onFormSubmit={handleAddRecipe} />}
          />
          <Route
            path='/recipebook'
            element={
              <RecipeBook
                onRecipeDislike={handleDeleteRecipe}
                recipes={recipes}
                isLiked={isLiked}
                setIsLiked={setIsLiked}
              />
            }
          />
          <Route path='/login' element={<LogIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route exact path='/' element={<Home />} />
          <Route
            path='*'
            element={
              <>
                <h1>404 not found</h1>
              </>
            }
          />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
