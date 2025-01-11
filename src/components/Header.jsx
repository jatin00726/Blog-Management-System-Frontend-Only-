import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Header = () => {
  const { userRole, setUserRole } = useAppContext();
  const navigate = useNavigate();

  const handleLogOut = () => {
    setUserRole(null); // Reset user role
    navigate("/"); // Redirect to login page
  };

  return (
    <header className="bg-primary text-white fixed-top shadow-lg z-index-1030">
      <div className="container d-flex justify-content-between align-items-center p-3">
        <h1 className="h3 mb-0">
          <Link to="/home" className="text-white text-decoration-none">
            Blog Management System
          </Link>
        </h1>
        <nav className="d-flex gap-4">
            {userRole === "reader" &&(
          <Link to="/home" className="text-white text-decoration-none hover-underline-animation">
            Home
          </Link>
          )}
          {userRole === "author" && (
            <>
              <Link to="/dashboard" className="text-white text-decoration-none hover-underline-animation">
                Dashboard
              </Link>
              <Link to="/create" className="text-white text-decoration-none hover-underline-animation">
                Create Blog
              </Link>
            </>
          )}
          {userRole && (
            <button
              onClick={handleLogOut}
              style={{
                backgroundColor: "#F59E0B", // Yellow-500
                color: "#FFFFFF",
                padding: "5px 10px",
                borderRadius: "5px",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              Log Out
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
