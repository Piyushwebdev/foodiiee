import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";
import RecipeReviewCard from "../components/RecipeReviewCard";

export const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `https://mern-recipe-app-uz2k.onrender.com/recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedRecipes();
  }, []);
  return (
    <div>
      <h1>Saved Recipes</h1>
      <div className="recipesBox">
        {savedRecipes.map((recipe) => (
          <RecipeReviewCard recipe={recipe} userID={userID} savedRecipes={savedRecipes} setSavedRecipes={setSavedRecipes}/>
        ))}
      </div>
    </div>
  );
};
