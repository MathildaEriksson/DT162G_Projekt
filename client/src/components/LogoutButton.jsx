//Mathilda Eriksson, DT162G, HT23
import { useNavigate } from "react-router-dom";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
      <button
        onClick={handleLogout}
        className="inline-flex items-center rounded-md bg-recipevaultred px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-recipevaultred"
      >
        <ArrowRightEndOnRectangleIcon
          className="-ml-1 mr-2 h-5 w-5"
          aria-hidden="true"
        />
        Logga ut
      </button>
  );
};

export default LogoutButton;
