// filter between liked and self created recipes
import React from "react";
import Recipe from "./Recipe";

function RecipeBook({ recipes, onRecipeDislike }) {
  const recipesDisplayed = recipes.map((recipe) => (
    <Recipe
      key={recipe.summary}
      recipe={recipe}
      onRecipeDislike={onRecipeDislike}
    />
  ));

  return (
    <div>
      {recipesDisplayed.length === 0
        ? "Your booka recipe book is currently empty. Go to Random Recipe or Add Recipe to add recipes to the Recipe Book."
        : recipesDisplayed}
    </div>
  );
}

export default RecipeBook;
