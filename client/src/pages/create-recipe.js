import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextareaAutosize } from "@mui/base";
import { createSvgIcon } from "@mui/material/utils";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const PlusIcon = createSvgIcon(
  // credit: plus icon from https://heroicons.com/
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.5v15m7.5-7.5h-15"
    />
  </svg>,
  "Plus"
);
export const CreateRecipe = () => {
  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);
  const [alertmsg, setAlertmsg] = useState("");
  const [recipe, setRecipe] = useState({
    name: "",
    descriptions: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (event, index) => {
    const { value } = event.target;
    const ingredients = [...recipe.ingredients];
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const handleAddIngredient = () => {
    const ingredients = [...recipe.ingredients, ""];
    setRecipe({ ...recipe, ingredients });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "https://mern-recipe-app-uz2k.onrender.com/recipes",
        { ...recipe },
        {
          headers: { authorization: cookies.access_token },
        }
      );
      navigate("/recipes");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setAlertmsg("Unauthorized access. Please login again.");
      } else {
        console.error(error);
      }
    }
  };
  useEffect(() => {
  console.log(recipe)
  }, [recipe])
  

  return (
      <div className="addContainer">
        
      <div className="create-recipe">
      {alertmsg && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="error">{alertmsg}</Alert>
          </Stack>
        )}
        <Typography variant="h4">Add a new recipe</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            id="name"
            name="name"
            value={recipe.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            size="small"
          />
          <TextField
            label="Description"
            id="descriptions"
            name="descriptions"
            value={recipe.descriptions}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            size="small"
          />
          {recipe.ingredients.map((ingredient, index) => (
            <TextField
              key={index}
              label={`Ingredient ${index + 1}`}
              name="ingredients"
              value={ingredient}
              onChange={(event) => handleIngredientChange(event, index)}
              fullWidth
              margin="normal"
              size="small"
            />
          ))}

          <Button
            component="label"
            role={undefined}
            variant="outlined"
            sx={{
              ":hover": {
                color: "#FF830F",
                borderColor: "#FF830F",
              },
              mt: "0.5rem",
              color: "#FF830F",
              borderColor: "#FF830F",
            }}
            startIcon={<PlusIcon />}
            onClick={handleAddIngredient}
          >
            Add Ingredients
          </Button>
          <TextField
            label="Instructions"
            id="instructions"
            name="instructions"
            value={recipe.instructions}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            size="small"
          />
          <TextField
            label="Image URL"
            id="imageUrl"
            name="imageUrl"
            value={recipe.imageUrl}
            onChange={handleChange}
            fullWidth
            margin="normal"
            size="small"
          />
          <TextField
            label="Cooking Time (minutes)"
            type="number"
            id="cookingTime"
            name="cookingTime"
            value={recipe.cookingTime}
            onChange={handleChange}
            fullWidth
            margin="normal"
            size="small"
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              ":hover": {
                backgroundColor: "#FFA500",
                borderColor: "#FFA500",
              },
              backgroundColor: "#FF830F",
              marginTop: "0.5rem",
            }}
          >
            Add Recipe
          </Button>
        </form>
     
      </div>
    </div>
  );
};
