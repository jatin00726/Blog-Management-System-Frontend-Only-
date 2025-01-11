import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUserRole } = useAppContext();
  const navigate = useNavigate();

  const handleLogin = () => {
    // Hardcoding roles based on username and password
    if (username === "author" && password === "author123") {
      setUserRole("author");
      navigate("/create");
    } else if (username === "reader" && password === "reader123") {
      setUserRole("reader");
      navigate("/home");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-gray-100">
      <div className="card shadow-lg" style={{ width: "100%", maxWidth: "400px" }}>
        <div className="card-body">
          <h5 className="card-title text-center">Login</h5>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleLogin}
            className="btn btn-primary w-100 mt-3"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
