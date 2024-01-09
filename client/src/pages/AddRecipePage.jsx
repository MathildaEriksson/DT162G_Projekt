//Mathilda Eriksson, DT162G, HT23

import React, { useState } from "react";
import API from "../services/axios";
import { useNavigate } from "react-router-dom";
import { PlusIcon, CheckIcon } from "@heroicons/react/24/outline";

const AddRecipePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    ingredients: [{ name: "", amount: "", unit: "" }],
    instructions: [""],
    image: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleIngredientChange = (index, e) => {
    const newIngredients = formData.ingredients.map((ingredient, i) => {
      if (index === i) {
        return { ...ingredient, [e.target.name]: e.target.value };
      }
      return ingredient;
    });
    setFormData({ ...formData, ingredients: newIngredients });
  };

  const addIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [
        ...formData.ingredients,
        { name: "", amount: "", unit: "" },
      ],
    });
  };

  const handleInstructionChange = (index, value) => {
    const newInstructions = formData.instructions.map((instruction, i) => {
      if (index === i) {
        return value;
      }
      return instruction;
    });
    setFormData({ ...formData, instructions: newInstructions });
  };

  const addInstruction = () => {
    setFormData({
      ...formData,
      instructions: [...formData.instructions, ""],
    });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Filter out empty ingredients
    const filteredIngredients = formData.ingredients.filter(
      (ingredient) => ingredient.name && ingredient.amount && ingredient.unit
    );

    // Filter out empty instructions
    const filteredInstructions = formData.instructions.filter((instruction) =>
      instruction.trim()
    );

    const data = new FormData();
    data.append("name", formData.name);
    data.append("category", formData.category);
    data.append("ingredients", JSON.stringify(filteredIngredients));
    data.append("instructions", JSON.stringify(filteredInstructions));

    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      const response = await API.post("/recipes", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/my-pages");
    } catch (error) {
      console.error("Error adding recipe:", error);
      // Hantera felmeddelanden här
    }
  };

  return (
    <div className="lg:pl-10 pl-2">
      <h2 className="leading-7 text-gray-900 text-3xl font-merriweather pb-6">
        Lägg till recept
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="pb-8">
          <label
            htmlFor="name"
            className="block text-base font-medium leading-6 text-gray-900 pb-1"
          >
            Receptnamn
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Receptnamn"
            required
            className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-900 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="pb-8">
          <label
            htmlFor="category"
            className="block text-base font-medium leading-6 text-gray-900 pb-1"
          >
            Kategori
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-900 sm:text-sm sm:leading-6"
          >
            <option value="">Välj en kategori</option>
            <option value="Dessert">Dessert</option>
            <option value="Huvudrätt">Huvudrätt</option>
            <option value="Förrätt">Förrätt</option>
            <option value="Sallad">Sallad</option>
            <option value="Annat">Annat</option>
          </select>
        </div>

        <div className="pb-8">
          <h3 className="block text-base font-medium leading-6 text-gray-900 pb-1">
            Ingredienser
          </h3>
          {formData.ingredients.map((ingredient, index) => (
            <div key={index} className="pb-4">
              <input
                type="text"
                name="name"
                value={ingredient.name}
                onChange={(e) => handleIngredientChange(index, e)}
                placeholder="Ingrediensens namn"
                required
                className="mr-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-900 sm:text-sm sm:leading-6"
              />
              <input
                type="text"
                name="amount"
                value={ingredient.amount}
                onChange={(e) => handleIngredientChange(index, e)}
                placeholder="Mängd"
                required
                className="mr-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-900 sm:text-sm sm:leading-6"
              />
              <input
                type="text"
                name="unit"
                value={ingredient.unit}
                onChange={(e) => handleIngredientChange(index, e)}
                placeholder="Enhet"
                required
                className="rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-900 sm:text-sm sm:leading-6"
              />
            </div>
          ))}

          <button
            type="button"
            onClick={addIngredient}
            className="inline-flex items-center rounded-md bg-recipevaultred px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-recipevaultred"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Lägg till ingrediens
          </button>
        </div>

        <div className="pb-8">
          <h3 className="block text-base font-medium leading-6 text-gray-900 pb-1">
            Instruktioner
          </h3>
          {formData.instructions.map((instruction, index) => (
            <div key={index} className="pb-4">
              <input
                type="text"
                value={instruction}
                onChange={(e) => handleInstructionChange(index, e.target.value)}
                placeholder="Instruktion"
                required
                className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-900 sm:text-sm sm:leading-6"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addInstruction}
            className="inline-flex items-center rounded-md bg-recipevaultred px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-recipevaultred"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Lägg till instruktion
          </button>
        </div>
        <div className="pb-10">
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            className="block text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-recipevaultred file:text-white hover:file:bg-red-950 hover:cursor-pointer hover:file:cursor-pointer"
          />
        </div>
        <div className="flex justify-end max-w-xl">
          <button
            type="submit"
            className="inline-flex items-center rounded-md bg-green-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-900"
          >
            <CheckIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Lägg till recept
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRecipePage;
