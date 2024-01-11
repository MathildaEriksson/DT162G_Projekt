//Mathilda Eriksson, DT162G, HT23

import React, { useState, useEffect } from "react";
import API from "../services/axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  PlusIcon,
  CheckIcon,
  XCircleIcon,
  XMarkIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

const EditRecipePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    ingredients: [],
    instructions: [],
    image: null,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await API.get(`/recipes/${id}`);
        setFormData(response.data);
      } catch (err) {
        setError("Kunde inte hämta receptet");
      }
    };
    fetchRecipe();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "name" && e.target.value.length < 5) {
      setFormErrors({
        ...formErrors,
        name: "Namnet måste vara minst 5 tecken långt.",
      });
    } else {
      setFormErrors({ ...formErrors, name: "" });
    }
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

  const removeIngredient = (index) => {
    if (formData.ingredients.length > 1) {
      setFormData({
        ...formData,
        ingredients: formData.ingredients.filter((_, i) => i !== index),
      });
    }
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

  const removeInstruction = (index) => {
    if (formData.instructions.length > 1) {
      setFormData({
        ...formData,
        instructions: formData.instructions.filter((_, i) => i !== index),
      });
    }
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.name.length < 5) {
      setFormErrors({
        ...formErrors,
        name: "Namnet måste vara minst 5 tecken långt.",
      });
      return;
    }

    // Filter out empty ingredients (not used now, as the fields are required)
    const filteredIngredients = formData.ingredients.filter(
      (ingredient) => ingredient.name && ingredient.amount && ingredient.unit
    );

    // Filter out empty instructions (not used now, as the fields are required)
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
      await API.put(`/recipes/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate(`/recipes/${id}`);
    } catch (error) {
      setError(error.response?.data?.message || "Ett okänt fel inträffade");
    }
  };

  return (
    <div className="lg:pl-10 pl-2">
      <h2 className="leading-7 text-gray-900 text-3xl font-merriweather pb-6">
        Redigera recept
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="pb-6">
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
          {formErrors.name && (
            <div className="rounded-md bg-red-50 p-4 max-w-fit">
              <div className="flex">
                <div className="flex-shrink-0">
                  <XCircleIcon
                    className="h-5 w-5 text-red-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    {formErrors.name}
                  </h3>
                </div>
              </div>
            </div>
          )}
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
            <div key={index} className="pb-4 flex">
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
              {formData.ingredients.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeIngredient(index)}
                  className="inline-flex items-center rounded-md bg-recipevaultred px-2 py-2 ml-2 text-sm font-semibold text-white shadow-sm hover:bg-red-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-recipevaultred"
                >
                  <TrashIcon
                    className="h-5 w-5"
                    aria-hidden="true"
                    aria-label="Ta bort ingrediens"
                  />
                </button>
              )}
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
            <div key={index} className="pb-4 flex">
              <input
                type="text"
                value={instruction}
                onChange={(e) => handleInstructionChange(index, e.target.value)}
                placeholder="Instruktion"
                required
                className="rounded-md border-0 py-1.5 w-3/4 xl:w-1/3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-900 sm:text-sm sm:leading-6"
              />
              {formData.instructions.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeInstruction(index)}
                  className="inline-flex items-center rounded-md bg-recipevaultred px-2 py-2 ml-2 text-sm font-semibold text-white shadow-sm hover:bg-red-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-recipevaultred"
                >
                  <TrashIcon
                    className="h-5 w-5"
                    aria-hidden="true"
                    aria-label="Ta bort instruktion"
                  />
                </button>
              )}
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
          <div className="text-sm text-slate-500 pt-2">
            Lägg till en ny bild om bilden ska uppdateras, annars behålls gamla
            bilden.
          </div>
        </div>
        <div className="flex justify-end max-w-xl">
          {error && (
            <div className="block text-red-600 text-sm font-semibold">
              {error}
            </div>
          )}
          <Link
            to="/my-pages"
            className="mr-4 inline-flex items-center rounded-md bg-neutral-100 px-3 py-2 text-sm font-semibold text-recipevaultred shadow-sm hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-recipevaultred border-solid border-2 border-recipevaultred"
          >
            <XMarkIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Avbryt
          </Link>
          <button
            type="submit"
            className="inline-flex items-center rounded-md bg-green-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-900"
          >
            <CheckIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Spara recept
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRecipePage;
