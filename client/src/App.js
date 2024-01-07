import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RecepiesPage from "./pages/RecepiesPage";
import UserPage from "./pages/UserPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <div class="py-4 flex-grow">
          <div class="lg:pl-72 px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/recepies" element={<RecepiesPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/my-pages" element={<UserPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
