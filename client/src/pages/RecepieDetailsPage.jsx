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
    <div className="lg:pl-10 pl-2">
      <h1 className="text-3xl font-merriweather pb-2">{recipe.name}, {recipe.category}</h1>
      <p className="text-sm text-gray-500 pb-2">
        {recipe.createdBy.name},{" "}
        {new Date(recipe.createdAt).toLocaleDateString()}
      </p>
      {recipe.image && (
        <img
          className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md max-w-xl"
          src={`http://localhost:3000/uploads/${recipe.image}`}
          alt={recipe.name}
        />
      )}

      <h2 className="text-2xl font-merriweather pt-4">Ingredienser</h2>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient.amount} {ingredient.unit} {ingredient.name}
          </li>
        ))}
      </ul>

      <h2 className="text-2xl font-merriweather pt-4">Instruktioner</h2>
      <ol className="list-decimal list-inside">
        {recipe.instructions.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ol>
    </div>
  );
};

export default RecipeDetails;
