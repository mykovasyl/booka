import React, { useState, useEffect, createContext } from "react";
import RandomRecipe from "./RandomRecipe";
import RecipeForm from "./RecipeForm";
import RecipeBook from "./RecipeBook";
import NavBar from "./NavBar";
import Home from "./Home";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import { Route, Routes, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MuiAppBar from "@mui/material/AppBar";
import { styled, useTheme } from "@mui/material/styles";

export const UserContext = createContext();

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [avatar, setAvatar] = useState(null);
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  // start of drawer code -- DO NOT EDIT BELOW THIS LINE --

  const theme = useTheme();
  const [open, setOpen] = useState(false);

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  const drawerWidth = 240;

  const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: `-${drawerWidth}px`,
      ...(open && {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      }),
    })
  );

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));

  // end of drawer code -- DO NOT EDIT ABOVE THIS LINE --

  // fetch current user else no user logged in
  useEffect(() => {
    fetch("/me").then((resp) => {
      if (resp.ok) {
        resp.json().then((user) => {
          setCurrentUser(user);
          // setAvatar(user.image_url);
        });
      } else {
        resp.json().then((error) => setErrors(error));
      }
    });
  }, []);

  // add a recipe from random recipe or your own
  function handleAddRecipe(recipe) {
    fetch(`/recipes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipe),
    })
      .then((resp) => resp.json())
      .then((postedRecipe) => {
        // add newly posted recipe with id into currentUser state
        let newRecipes = [...currentUser.recipes, postedRecipe];
        setCurrentUser({ ...currentUser, recipes: newRecipes });
      });
  }

  // delete a recipe from your recipe book
  function handleDeleteRecipe(id) {
    let newRecipes = currentUser.recipes.filter((recipe) => recipe.id !== id);
    fetch(`/recipes/${id}`, {
      method: "DELETE",
    });
    setCurrentUser({ ...currentUser, recipes: newRecipes });
  }

  function handleLogOut() {
    fetch("/logout", {
      method: "DELETE",
    });
    setCurrentUser({});
    navigate("/");
  }

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        avatar,
        handleLogOut,
        handleAddRecipe,
        handleDeleteRecipe,
      }}
    >
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position='fixed' open={open}>
          <Toolbar style={{ backgroundColor: "#ba3b0a" }}>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              onClick={handleDrawerOpen}
              edge='start'
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' noWrap component='div'>
              <img style={{ paddingTop: "10px" }} width='300' height='75' />
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant='persistent'
          anchor='left'
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <NavBar />
          <Divider />
        </Drawer>
        <Main open={open} style={{ paddingTop: "40px" }}>
          <DrawerHeader />
          <Routes>
            <Route path='/randomrecipe' element={<RandomRecipe />} />
            <Route path='/recipeform' element={<RecipeForm />} />
            <Route path='/recipebook' element={<RecipeBook />} />
            <Route path='/login' element={<LogIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route exact path='/' element={<Home />} />
            <Route
              path='*'
              element={
                <>
                  <h1>404 not found</h1>
                </>
              }
            />
          </Routes>
        </Main>
      </Box>
    </UserContext.Provider>
  );
}

export default App;
