//Mathilda Eriksson, DT162G, HT23

import React, { useState, useEffect } from "react";
import API from "../services/axios";
import RecepiesList from "../components/RecepiesList";

const UserPage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    API.get("recepies/myrecepies")
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the recipes", error);
      });
  }, []);

  return (
    <div className="lg:pl-10 pl-2">
      <h1 className="text-3xl font-merriweather pb-4">Mina recept</h1>
      {recipes.length > 0 ? (
        <RecepiesList recipes={recipes}/>
      ) : (
        <p>Du har inga recept än.</p>
      )}
    </div>
  );
};

export default UserPage;
