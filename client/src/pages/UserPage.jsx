//Mathilda Eriksson, DT162G, HT23

import React, { useState, useEffect } from "react";
import API from "../services/axios";
import RecipesList from "../components/RecipesList";
import { Link } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/24/outline";

const UserPage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    API.get("recipes/myrecipes")
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the recipes", error);
      });
  }, []);

  return (
    <div className="lg:pl-10 pl-2">
      <div className="flex justify-between">
        <h1 className="text-3xl font-merriweather pb-4">Mina recept</h1>
        <div>
          <Link
            to="/add-recipes"
            className="inline-flex items-center rounded-md bg-green-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-900"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Lägg till recept
          </Link>
        </div>
      </div>
      {recipes.length > 0 ? (
        <RecipesList recipes={recipes} />
      ) : (
        <p>Du har inga recept än.</p>
      )}
    </div>
  );
};

export default UserPage;
