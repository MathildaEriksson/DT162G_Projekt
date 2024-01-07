import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RecepiesPage from "./pages/RecepiesPage";
import UserPage from "./pages/UserPage";
import RecepieDetailsPage from "./pages/RecepieDetailsPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <div className="py-4 flex-grow">
          <div className="lg:pl-72 px-4 lg:px-8 py-4 bg-neutral-100">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/recepies" element={<RecepiesPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/my-pages" element={<UserPage />} />
              <Route path="/recepies/:id" element={<RecepieDetailsPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
