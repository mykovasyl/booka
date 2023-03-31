import { Button } from "@mui/material";
import React, { useContext } from "react";
import { UserContext } from "./App";
import Recipe from "./Recipe";

function RandomRecipe() {
  const { handleAddRecipe, recipe, setRecipe } = useContext(UserContext);

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
      });
  }

  return (
    <div>
      <Button
        type='button'
        variant='contained'
        onClick={handleClick}
        style={{ backgroundColor: "#DE5928" }}
      >
        Get Random Recipe
      </Button>
      {recipe.title ? (
        <Recipe recipe={recipe} handleAddRecipe={handleAddRecipe} />
      ) : null}
    </div>
  );
}

export default RandomRecipe;
