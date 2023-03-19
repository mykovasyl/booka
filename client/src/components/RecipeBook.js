import React, { useContext } from "react";
import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
import { UserContext } from "./App";
import Recipe from "./Recipe";

function RecipeBook() {
  const { currentUser } = useContext(UserContext);
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  const recipesDisplayed = currentUser.recipes.map((recipe) => (
    <Grid item md={4}>
      <Item>
        <Recipe key={recipe.summary} recipe={recipe} />
      </Item>
    </Grid>
  ));

  return (
    <Grid container spacing={2}>
      {recipesDisplayed.length === 0
        ? "Your booka recipe book is currently empty. Go to Random Recipe or Add Recipe to add recipes!"
        : recipesDisplayed}
    </Grid>
  );
}

export default RecipeBook;
