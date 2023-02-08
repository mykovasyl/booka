import React, { useState } from "react";
import Recipe from "./Recipe";

function RandomRecipe({ onRecipeLike, isLiked, setIsLiked }) {
  const [recipe, setRecipe] = useState({
    title: "",
    readyIn: "",
    image: "",
    summary: "",
    instructions: "",
    ingredients: [],
    sourceUrl: "",
    liked: false,
  });
  const [isLoaded, setIsLoaded] = useState(false);

  function handleClick() {
    fetch(
      `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`
    )
      .then((resp) => resp.json())
      .then((data) => {
        setRecipe({
          title: data.recipes[0].title,
          readyIn: data.recipes[0].readyInMinutes,
          image: data.recipes[0].image,
          summary: data.recipes[0].summary,
          instructions: data.recipes[0].instructions,
          ingredients: data.recipes[0].extendedIngredients,
          sourceUrl: data.recipes[0].spoonacularSourceUrl,
          liked: false,
        });
        setIsLiked(false);
        setIsLoaded(true);
      });
  }

  return (
    <div>
      <button type="button" onClick={handleClick}>
        Get Random Recipe
      </button>
      {isLoaded ? (
        <Recipe
          recipe={recipe}
          onRecipeLike={onRecipeLike}
          isLiked={isLiked}
          setIsLiked={setIsLiked}
        />
      ) : null}
    </div>
  );
}

export default RandomRecipe;
