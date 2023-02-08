import React, { useState } from "react";

function RecipeForm({ onFormSubmit }) {
  const [newRecipe, setNewRecipe] = useState({
    title: "",
    readyIn: "",
    image: "",
    summary: "",
    instructions: "",
    ingredients: [],
    sourceUrl: "",
    liked: false,
  });

  const [ingredientsList, setIngredientsList] = useState([
    { name: "", amount: "", unit: "" },
  ]);

  function handleChange(e) {
    setNewRecipe({ ...newRecipe, [e.target.name]: e.target.value });
  }

  function handleIngredientAdd() {
    setIngredientsList([
      ...ingredientsList,
      { name: "", amount: "", unit: "" },
    ]);
  }

  function handleOnChange(index, e) {
    const updatedIngredients = ingredientsList.map((ing, i) => {
      if (index === i) {
        return {
          ...ing,
          [e.target.name]: e.target.value,
        };
      } else {
        return ing;
      }
    });
    setIngredientsList(updatedIngredients);
  }

  const ingredients = ingredientsList.map((ingredient, index) => (
    <div key={index}>
      <input
        name="name"
        placeholder="Name..."
        value={ingredient.name}
        onChange={(event) => handleOnChange(index, event)}
      />
      <input
        name="amount"
        placeholder="Amount..."
        value={ingredient.amount}
        onChange={(event) => handleOnChange(index, event)}
      />
      <input
        name="unit"
        placeholder="Unit..."
        value={ingredient.unit}
        onChange={(event) => handleOnChange(index, event)}
      />
    </div>
  ));

  function handleSubmit(e) {
    e.preventDefault();
    const recipeWithIngredients = {
      ...newRecipe,
      ingredients: ingredientsList,
    };
    onFormSubmit(recipeWithIngredients);
    setIngredientsList([{ name: "", amount: "", unit: "" }]);
    setNewRecipe({
      title: "",
      readyIn: "",
      image: "",
      summary: "",
      instructions: "",
      ingredients: [],
      sourceUrl: "",
      liked: false,
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Recipe Name:</label>
        <input
          type="text"
          name="title"
          value={newRecipe.title}
          onChange={handleChange}
        ></input>
        <br></br>

        <label>Ready in:</label>
        <input
          type="text"
          name="readyIn"
          value={newRecipe.readyIn}
          onChange={handleChange}
        ></input>
        <label>minutes</label>
        <br></br>

        <label>Summary:</label>
        <br></br>
        <textarea
          name="summary"
          rows="5"
          cols="50"
          value={newRecipe.summary}
          onChange={handleChange}
        ></textarea>
        <br></br>

        <label>Image:</label>
        <input
          type="text"
          name="image"
          value={newRecipe.image}
          onChange={handleChange}
        ></input>
        <br></br>

        <label>Ingredients:</label>
        <br></br>
        {ingredients}
        <button type="button" onClick={handleIngredientAdd}>
          Add more ingredients
        </button>
        <br></br>

        <label>Instructions:</label>
        <br></br>
        <textarea
          name="instructions"
          rows="5"
          cols="50"
          value={newRecipe.instructions}
          onChange={handleChange}
        ></textarea>
        <br></br>

        <label>Optional source link:</label>
        <input
          type="text"
          name="sourceUrl"
          value={newRecipe.sourceUrl}
          onChange={handleChange}
        ></input>
        <br></br>

        <button type="submit">Add Recipe To Book</button>
      </form>
    </div>
  );
}

export default RecipeForm;
