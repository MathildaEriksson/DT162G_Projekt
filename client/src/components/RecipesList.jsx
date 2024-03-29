//Mathilda Eriksson, DT162G, HT23
import { Link } from "react-router-dom";

// Takes recipes as a prop and writes out the recipes in a list
const RecipesList = ({ recipes }) => {

  return (
    <div>
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="group relative">
            {recipe.image && (
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={`http://localhost:3000/uploads/${recipe.image}`}
                  alt={recipe.name}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
            )}
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-lg text-gray-700">
                  <Link to={`/recipes/${recipe._id}`}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {recipe.name}
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {recipe.createdBy.name},{" "}
                  {new Date(recipe.createdAt).toLocaleDateString()}
                </p>
                <p className="mt-1 text-sm text-gray-500">{recipe.category}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipesList;
