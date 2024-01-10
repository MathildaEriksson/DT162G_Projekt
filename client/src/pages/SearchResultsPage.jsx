//Mathilda Eriksson, DT162G, HT23

import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import API from "../services/axios";
import RecipesList from "../components/RecipesList";

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const searchTerm = searchParams.get("query");

    const fetchRecipes = async () => {
      setError("");
      setRecipes([]);
      try {
        const response = await API.get(`recipes/search?name=${searchTerm}`);
        setRecipes(response.data);
      } catch (error) {
        setError(error.response?.data || "Ett fel inträffade vid sökningen");
      }
    };

    if (searchTerm) {
      fetchRecipes();
    }
  }, [searchParams]);

  return (
    <div className="lg:pl-10 pl-2">
      <h1 className="text-3xl font-merriweather pb-4">Sökresultat</h1>
      {error && <div>{error}</div>}
      <RecipesList recipes={recipes} />
    </div>
  );
};

export default SearchResultsPage;
