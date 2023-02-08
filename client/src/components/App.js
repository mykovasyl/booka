import React, { useState, useEffect } from "react";
import RandomRecipe from "./RandomRecipe";
import RecipeForm from "./RecipeForm";
import RecipeBook from "./RecipeBook";
import NavBar from "./NavBar";
import Home from "./Home";
import { Switch, Route } from "react-router-dom";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [isLiked, setIsLiked] = useState(false);

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
      <NavBar />
      <Switch>
        <Route path="/randomrecipe">
          <RandomRecipe
            onRecipeLike={handleAddRecipe}
            isLiked={isLiked}
            setIsLiked={setIsLiked}
          />
        </Route>
        <Route path="/recipeform">
          <RecipeForm onFormSubmit={handleAddRecipe} />
        </Route>
        <Route path="/recipebook">
          <RecipeBook
            onRecipeDislike={handleDeleteRecipe}
            recipes={recipes}
            isLiked={isLiked}
            setIsLiked={setIsLiked}
          />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="*">
          <h1>404 not found</h1>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
