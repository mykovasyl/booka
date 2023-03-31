import React, { useContext, useState } from "react";
import { UserContext } from "./App";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Rating } from "@mui/material";

function Recipe({ recipe }) {
  const {
    currentUser,
    handleDeleteRecipe,
    handleAddRecipe,
    handleUpdateRecipe,
  } = useContext(UserContext);
  const {
    title,
    readyIn,
    image,
    summary,
    ingredients,
    instructions,
    sourceURL,
    rating = 0,
    user_id = null,
    id = null,
  } = recipe;
  const [ratingValue, setRatingValue] = useState(rating);

  const mappedIngredients = ingredients.map((ingredient) => (
    <li key={ingredient}>{ingredient}</li>
  ));

  function addRecipe() {
    recipe.user_id = currentUser.id;
    recipe.rating = ratingValue;
    handleAddRecipe(recipe);
  }

  function deleteRecipe() {
    handleDeleteRecipe(id);
  }

  function updateRating(newRating) {
    recipe.rating = newRating;
    handleUpdateRecipe(recipe);
  }

  // start of card code -- DO NOT EDIT BELOW THIS LINE --

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const readyInText = `Ready in ${readyIn} minutes`;

  // end of card code -- DO NOT EDIT ABOVE THIS LINE --

  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardHeader title={title} subheader={readyInText} />
      {user_id && recipe.id ? (
        <Rating
          name='simple-controlled'
          value={ratingValue}
          precision={0.5}
          onChange={(event, newRating) => {
            setRatingValue(newRating);
            updateRating(newRating);
          }}
        />
      ) : null}
      <CardMedia component='img' height='194' image={image} alt='food' />
      <CardContent>
        <Typography variant='body2' color='text.secondary'>
          <div dangerouslySetInnerHTML={{ __html: summary }} />
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {user_id ? (
          id ? (
            <Button
              type='button'
              variant='contained'
              onClick={deleteRecipe}
              style={{ backgroundColor: "#bd2a00" }}
            >
              Delete it!
            </Button>
          ) : null
        ) : (
          <IconButton
            aria-label='add to favorites'
            type='button'
            variant='contained'
            onClick={addRecipe}
          >
            <FavoriteIcon sx={{ color: "#FF7844" }} />
          </IconButton>
        )}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label='show more'
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          <Typography paragraph>
            <h3>Ingredients:</h3>
            <ul>{mappedIngredients}</ul>
            <h3>Instructions:</h3>
            <div dangerouslySetInnerHTML={{ __html: instructions }} />
            <p>
              For more information visit: <a href={sourceURL}>Spoonacular</a>
            </p>
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default Recipe;
