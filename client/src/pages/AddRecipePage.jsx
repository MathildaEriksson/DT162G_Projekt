//Mathilda Eriksson, DT162G, HT23

import React, { useState } from "react";
import API from "../services/axios";

const AddRecipePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    ingredients: [{ name: "", amount: "", unit: "" }],
    instructions: [""],
    image: null,
  });

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
    const data = new FormData();
    for (const key in formData) {
      if (key === "ingredients" || key === "instructions") {
        data.append(key, JSON.stringify(formData[key]));
      } else {
        data.append(key, formData[key]);
      }
    }

    try {
      const response = await API.post("/recipes", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      // Vidare navigering + uppdatera listan av recept
    } catch (error) {
      console.error("Error adding recipe:", error);
      // Hantera felmeddelanden här
    }
  };

  return (
    <div>
      <h2>Lägg till Nytt Recept</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Receptnamn"
        />
        <label htmlFor="category">Kategori</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Välj en kategori</option>
          <option value="Dessert">Dessert</option>
          <option value="Huvudrätt">Huvudrätt</option>
          <option value="Förrätt">Förrätt</option>
          <option value="Sallad">Sallad</option>
          <option value="Annat">Annat</option>
        </select>

        {/* Hantera ingredienser */}
        {formData.ingredients.map((ingredient, index) => (
          <div key={index}>
            <input
              type="text"
              name="name"
              value={ingredient.name}
              onChange={(e) => handleIngredientChange(index, e)}
              placeholder="Ingrediensens namn"
            />
            <input
              type="text"
              name="amount"
              value={ingredient.amount}
              onChange={(e) => handleIngredientChange(index, e)}
              placeholder="Mängd"
            />
            <input
              type="text"
              name="unit"
              value={ingredient.unit}
              onChange={(e) => handleIngredientChange(index, e)}
              placeholder="Enhet"
            />
          </div>
        ))}
        <button type="button" onClick={addIngredient}>
          Lägg till Ingrediens
        </button>
        {/* Hantera instruktioner */}
        {formData.instructions.map((instruction, index) => (
          <div key={index}>
            <input
              type="text"
              value={instruction}
              onChange={(e) => handleInstructionChange(index, e.target.value)}
              placeholder="Instruktion"
            />
          </div>
        ))}
        <button type="button" onClick={addInstruction}>
          Lägg till Instruktion
        </button>
        {/* Hantera bilduppladdning */}
        <input type="file" name="image" onChange={handleImageChange} />
        <button type="submit">Lägg till Recept</button>
      </form>
    </div>
  );
};

export default AddRecipePage;
