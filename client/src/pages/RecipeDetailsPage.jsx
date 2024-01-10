//Mathilda Eriksson, DT162G, HT23
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/axios";
import { jwtDecode } from "jwt-decode";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

const RecipeDetails = () => {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    API.get(`recipes/${id}`)
      .then((response) => {
        setRecipe(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the recipe", error);
      });
  }, [id]);

  const jwtToken = localStorage.getItem("token");
  let userId = null;

  if (jwtToken) {
    try {
      const decodedToken = jwtDecode(jwtToken);
      userId = decodedToken._id;
    } catch (error) {
      console.error("Token decoding error:", error);
    }
  }

  const handleEdit = () => {
    navigate(`/edit-recipe/${id}`); 
  };

  const handleDelete = async () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await API.delete(`recipes/${id}`);
      navigate("/recipes");
    } catch (error) {
      console.error("Error deleting recipe:", error);
    } finally {
      setShowDeleteModal(false); 
    }
  };

  if (!recipe) return <div>Loading...</div>;

  const isUserOwner = recipe && recipe.createdBy._id === userId;

  return (
    <div className="lg:pl-10 pl-2">
      <h1 className="text-3xl font-merriweather pb-2">
        {recipe.name}, {recipe.category}
      </h1>
      <p className="text-sm text-gray-500 pb-2">
        {recipe.createdBy.name},{" "}
        {new Date(recipe.createdAt).toLocaleDateString()}
      </p>
      {isUserOwner && (
        <div className="pb-4">
          <button
            onClick={handleEdit}
            className="inline-flex items-center rounded-md bg-amber-500 px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 mr-4"
          >
            {" "}
            <PencilIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Redigera Recept
          </button>
          <button
            onClick={handleDelete}
            className="inline-flex items-center rounded-md bg-recipevaultred px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-recipevaultred"
          >
            <TrashIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Radera recept
          </button>
          <ConfirmDeleteModal
            isOpen={showDeleteModal}
            onCancel={() => setShowDeleteModal(false)}
            onConfirm={confirmDelete}
          />
        </div>
      )}
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
