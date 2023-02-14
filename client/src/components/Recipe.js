import React, { useContext } from "react";
import { UserContext } from "./App";

function Recipe({ recipe, handleAddRecipe, handleDeleteRecipe }) {
  const { currentUser } = useContext(UserContext);
  const {
    title,
    readyIn,
    image,
    summary,
    ingredients,
    instructions,
    sourceUrl,
    liked,
    user_id,
    id = null,
  } = recipe;

  const mappedIngredients = ingredients.map((ingredient) => (
    <li key={ingredient.name}>
      {ingredient.name}: {ingredient.amount} {ingredient.unit}
    </li>
  ));

  function handleClick() {
    if (!liked) {
      recipe.liked = true;
      recipe.user_id = currentUser.id;
      handleAddRecipe(recipe);
    } else if (liked) {
      handleDeleteRecipe(id);
    }
  }

  return (
    <div>
      <h1>{title}</h1>
      {liked ? (
        id ? (
          <button type='button' onClick={handleClick}>
            Delete it!
          </button>
        ) : null
      ) : (
        <button type='button' onClick={handleClick}>
          Like it!
        </button>
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
        For more information visit: <a href={sourceUrl}>Spoonacular</a>
      </p>
    </div>
  );
}

export default Recipe;
