import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../services/axios";

const RecipeDetails = () => {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    API.get(`recepies/${id}`)
      .then((response) => {
        setRecipe(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the recipe", error);
      });
  }, [id]);

  if (!recipe) return <div>Loading...</div>;

  return (
    <div>
      <div className="lg:pl-10 pl-2">
        <h1 className="text-3xl font-merriweather pb-4">{recipe.name}</h1>
      </div>
    </div>
  );
};

export default RecipeDetails;
