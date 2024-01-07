//Mathilda Eriksson, DT162G, HT23

import React from "react";
import RecepiesList from "../components/RecepiesList";

const RecepiesPage = () => {
  return (
    <div className="lg:pl-10 pl-2">
      <h1 className="text-3xl font-merriweather pb-4">Alla recept</h1>
      <RecepiesList/>
    </div>
  );
};

export default RecepiesPage;
