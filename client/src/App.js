import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RecipesPage from "./pages/RecipesPage";
import UserPage from "./pages/UserPage";
import RecipeDetailsPage from "./pages/RecipeDetailsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AddRecipePage from "./pages/AddRecipePage";
import EditRecipePage from "./pages/EditRecipePage";
import SearchResultsPage from "./pages/SearchResultsPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <div className="py-4 flex-grow">
          <div className="lg:pl-72 px-4 lg:px-8 py-4 bg-neutral-100">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/recipes" element={<RecipesPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/recipes/:id" element={<RecipeDetailsPage />} />
              <Route path="/search-results" element={<SearchResultsPage />} />
              <Route
                path="/edit-recipe/:id"
                element={
                  <ProtectedRoute>
                    <EditRecipePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/my-pages"
                element={
                  <ProtectedRoute>
                    <UserPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/add-recipes"
                element={
                  <ProtectedRoute>
                    <AddRecipePage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
