import React, { useState } from "react";
import Recipe from "./Recipe";

function RandomRecipe({ handleAddRecipe }) {
  const [recipe, setRecipe] = useState({
    title: "",
    readyIn: "",
    image: "",
    summary: "",
    instructions: "",
    ingredients: [],
    sourceURL: "",
    user_id: null,
  });
  const [isLoaded, setIsLoaded] = useState(false);

  function handleClick() {
    fetch(
      `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`
    )
      .then((resp) => resp.json())
      .then((data) => {
        let newIngredients = data.recipes[0].extendedIngredients.map(
          (ingredient) => {
            return `${ingredient.name}: ${ingredient.amount} ${ingredient.unit}`;
          }
        );
        setRecipe({
          title: data.recipes[0].title,
          readyIn: data.recipes[0].readyInMinutes,
          image: data.recipes[0].image,
          summary: data.recipes[0].summary,
          instructions: data.recipes[0].instructions,
          ingredients: newIngredients,
          sourceURL: data.recipes[0].spoonacularSourceUrl,
          user_id: null,
        });
        setIsLoaded(true);
      });
  }

  return (
    <div>
      <button type='button' onClick={handleClick}>
        Get Random Recipe
      </button>
      {isLoaded ? (
        <Recipe recipe={recipe} handleAddRecipe={handleAddRecipe} />
      ) : null}
    </div>
  );
}

export default RandomRecipe;
