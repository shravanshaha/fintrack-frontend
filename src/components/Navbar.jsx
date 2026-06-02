import { Link, useNavigate, useLocation } from "react-router-dom";

import api from "../services/api";

function Navbar() {
  const navigate = useNavigate();

  const location = useLocation();

  if (location.pathname === "/" || location.pathname === "/login") {
    return null;
  }

  const logout = async () => {
    try {
      await api.get("/auth?action=logout");

      sessionStorage.removeItem("loggedIn");

      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container navbar">
      <h2>💰 FinTrack</h2>

      <Link to="/dashboard">Dashboard</Link>

      <Link to="/categories">Categories</Link>

      <Link to="/transactions">Transactions</Link>

      <button className="logout-btn" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Navbar;
