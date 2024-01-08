//Mathilda Eriksson, DT162G, HT23

import React, { useState, useEffect } from "react";
import RecepiesList from "../components/RecepiesList";
import API from "../services/axios";

const RecepiesPage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    API.get("recepies")
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
      <RecepiesList recipes={recipes}/>
    </div>
  );
};

export default RecepiesPage;
