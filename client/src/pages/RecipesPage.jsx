//Mathilda Eriksson, DT162G, HT23

import React, { useState, useEffect } from "react";
import RecipesList from "../components/RecipesList";
import API from "../services/axios";

const RecipesPage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    API.get("recipes")
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the recipes", error);
      });
  }, []);

  return (
    <div className="lg:pl-10 pl-2">
      <h1 className="text-3xl font-merriweather pb-4">Alla recept</h1>
      <RecipesList recipes={recipes}/>
    </div>
  );
};

export default RecipesPage;
