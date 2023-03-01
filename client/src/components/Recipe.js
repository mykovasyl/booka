import React, { useContext } from "react";
import { UserContext } from "./App";
import Button from "@mui/material/Button";

function Recipe({ recipe }) {
  const { currentUser, handleDeleteRecipe, handleAddRecipe } =
    useContext(UserContext);
  const {
    title,
    readyIn,
    image,
    summary,
    ingredients,
    instructions,
    sourceURL,
    user_id = null,
    id = null,
  } = recipe;

  const mappedIngredients = ingredients.map((ingredient) => (
    <li key={ingredient}>{ingredient}</li>
  ));

  function addRecipe() {
    recipe.user_id = currentUser.id;
    handleAddRecipe(recipe);
  }

  function deleteRecipe() {
    handleDeleteRecipe(id);
  }

  return (
    <div>
      <h1>{title}</h1>
      {user_id ? (
        id ? (
          <Button type='button' variant='contained' onClick={deleteRecipe}>
            Delete it!
          </Button>
        ) : null
      ) : (
        <Button type='button' variant='contained' onClick={addRecipe}>
          Like it!
        </Button>
      )}
      <h3>Ready in {readyIn} minutes</h3>
      <img src={image} alt='food'></img>
      <h3>Summary:</h3>
      <div dangerouslySetInnerHTML={{ __html: summary }} />
      <h3>Ingredients:</h3>
      <ul>{mappedIngredients}</ul>
      <h3>Instructions:</h3>
      <div dangerouslySetInnerHTML={{ __html: instructions }} />
      <p>
        For more information visit: <a href={sourceURL}>Spoonacular</a>
      </p>
    </div>
  );
}

export default Recipe;
