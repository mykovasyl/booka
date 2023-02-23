// filter between liked and self created recipes
import React, { useContext } from "react";
import { UserContext } from "./App";
import Recipe from "./Recipe";

function RecipeBook() {
  const { currentUser } = useContext(UserContext);
  const recipesDisplayed = currentUser.recipes.map((recipe) => (
    <Recipe key={recipe.summary} recipe={recipe} />
  ));

  return (
    <div>
      {recipesDisplayed.length === 0
        ? "Your booka recipe book is currently empty. Go to Random Recipe or Add Recipe to add recipes!"
        : recipesDisplayed}
    </div>
  );
}

export default RecipeBook;
