import React, { useState, useEffect, createContext } from "react";
import RandomRecipe from "./RandomRecipe";
import RecipeForm from "./RecipeForm";
import RecipeBook from "./RecipeBook";
import NavBar from "./NavBar";
import Home from "./Home";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import { Route, Routes, useNavigate } from "react-router-dom";

export const UserContext = createContext();

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [avatar, setAvatar] = useState(null);
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  // fetch current user else no user logged in
  useEffect(() => {
    fetch("/me").then((resp) => {
      if (resp.ok) {
        resp.json().then((user) => {
          setCurrentUser(user);
          // setAvatar(user.image_url);
        });
      } else {
        resp.json().then((error) => setErrors(error));
      }
    });
  }, []);

  // add a recipe from random recipe or your own
  function handleAddRecipe(recipe) {
    fetch(`/recipes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipe),
    })
      .then((resp) => resp.json())
      .then((postedRecipe) => {
        // add newly posted recipe with id into currentUser state
        let newRecipes = [...currentUser.recipes, postedRecipe];
        setCurrentUser({ ...currentUser, recipes: newRecipes });
      });
  }

  // delete a recipe from your recipe book
  function handleDeleteRecipe(id) {
    let newRecipes = currentUser.recipes.filter((recipe) => recipe.id !== id);
    fetch(`/recipes/${id}`, {
      method: "DELETE",
    });
    setCurrentUser({ ...currentUser, recipes: newRecipes });
  }

  function handleLogOut() {
    fetch("/logout", {
      method: "DELETE",
    });
    setCurrentUser({});
    navigate("/");
  }

  return (
    <div>
      <UserContext.Provider
        value={{
          currentUser,
          setCurrentUser,
          avatar,
          handleLogOut,
          handleAddRecipe,
          handleDeleteRecipe,
        }}
      >
        <NavBar />
        <Routes>
          <Route path='/randomrecipe' element={<RandomRecipe />} />
          <Route path='/recipeform' element={<RecipeForm />} />
          <Route path='/recipebook' element={<RecipeBook />} />
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
