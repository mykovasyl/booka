import { Button, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { UserContext } from "./App";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider, createTheme } from "@mui/material/styles";

function RecipeForm() {
  const { currentUser, handleAddRecipe } = useContext(UserContext);
  const [newRecipe, setNewRecipe] = useState({
    title: "",
    readyIn: "",
    image: "",
    summary: "",
    instructions: "",
    ingredients: [],
    sourceUrl: "",
    user_id: currentUser.id,
  });
  const theme = createTheme();

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
    <Grid item xs={12} key={index}>
      <TextField
        required
        sx={{ width: 1 / 2 }}
        variant='standard'
        label='Ingredient name'
        name='name'
        value={ingredient.name}
        onChange={(event) => handleOnChange(index, event)}
      />
      <TextField
        required
        sx={{ width: 1 / 4 }}
        variant='standard'
        label='Amount'
        name='amount'
        value={ingredient.amount}
        onChange={(event) => handleOnChange(index, event)}
      />
      <TextField
        required
        sx={{ width: 1 / 4 }}
        variant='standard'
        label='Unit'
        name='unit'
        value={ingredient.unit}
        onChange={(event) => handleOnChange(index, event)}
      />
    </Grid>
  ));

  function handleSubmit(e) {
    e.preventDefault();
    // turn ingredients from array of objects into array of strings
    let newIngredients = ingredientsList.map((ingredient) => {
      return `${ingredient.name}: ${ingredient.amount} ${ingredient.unit}`;
    });
    // replace ingredients array
    const recipeWithIngredients = {
      ...newRecipe,
      ingredients: newIngredients,
    };
    handleAddRecipe(recipeWithIngredients);
    setIngredientsList([{ name: "", amount: "", unit: "" }]);
    setNewRecipe({
      title: "",
      readyIn: "",
      image: "",
      summary: "",
      instructions: "",
      ingredients: [],
      sourceUrl: "",
      user_id: currentUser.id,
    });
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='md'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component='h1' variant='h4'>
            Add your own recipe to your booka!
          </Typography>
          <Box
            component='form'
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item sx={{ mr: 3 }} xs={7}>
                <TextField
                  name='title'
                  label='Recipe Name'
                  variant='standard'
                  required
                  fullWidth
                  value={newRecipe.title}
                  onChange={handleChange}
                  // autoFocus
                />
              </Grid>
              <Grid item xs={4.65}>
                <TextField
                  required
                  fullWidth
                  label='Ready in (minutes)'
                  variant='standard'
                  name='readyIn'
                  value={newRecipe.readyIn}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  multiline
                  minRows={3}
                  variant='standard'
                  label='Summary'
                  name='summary'
                  value={newRecipe.summary}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  variant='standard'
                  label='Image URL'
                  name='image'
                  value={newRecipe.image}
                  onChange={handleChange}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <Typography>Ingredients</Typography>
              </Grid> */}
              {ingredients}
              <Grid item xs={12}>
                <Button
                  style={{ color: "#ba3b0a" }}
                  type='button'
                  onClick={handleIngredientAdd}
                >
                  Add more ingredients
                </Button>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  multiline
                  minRows={5}
                  variant='standard'
                  label='Instructions'
                  name='instructions'
                  value={newRecipe.instructions}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant='standard'
                  label='Optional source URL'
                  name='sourceUrl'
                  value={newRecipe.sourceUrl}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Grid display='flex' justifyContent='center' alignItems='center'>
              <Button
                type='submit'
                variant='contained'
                sx={{ mt: 3, mb: 2, backgroundColor: "#DE5928" }}
              >
                Add to booka!
              </Button>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default RecipeForm;
