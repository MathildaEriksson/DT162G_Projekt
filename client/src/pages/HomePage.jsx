//Mathilda Eriksson, DT162G, HT23

import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="lg:pl-10 pl-2">
      <h1 className="text-3xl font-merriweather pb-4">
        Välkommen till Recipe Vault!
      </h1>
      <p className="pb-4">
        Upptäck en värld av smaker och kreativitet i matlagning med Recipe
        Vault, din ultimata plattform för att utforska och skapa läckra recept.
      </p>
      <p className="pb-4">
        Här kan du söka efter recept (endast namn) och bläddra bland alla
        recept.
      </p>
      <p className="pb-4">
        Om du skapar ett konto kan du även lägga till egna recept som du sedan kan redigera eller ta bort om du vill.        
      </p>
      <Link
            to="/register"
            className="font-semibold leading-6 text-green-900 hover:text-green-950"
          >
            Registrera dig här
          </Link>
    </div>
  );
};

export default HomePage;
