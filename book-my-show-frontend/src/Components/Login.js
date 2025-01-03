import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const loginData = {
      userName: userName,
      password: password,
    };

    axios
      .post("http://localhost:8080/api/login", loginData)
      .then((response) => {
        const token = response.data.token;

        localStorage.setItem("token", token);
        localStorage.setItem("username", userName);

        axios
          .get("http://localhost:8080/api/users/username/" + userName, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((userResponse) => {
            const user = userResponse.data;

            localStorage.setItem("role", user.role);
            localStorage.setItem("userID", user.id);

            navigate("/dashboard/movies");
          })
          .catch((userError) => {
            setError("Failed to fetch user details. Please try again.");
            console.error("Error fetching user details:", userError);
          });
      })
      .catch((loginError) => {
        setError("Invalid username or password");
        console.error("Login error:", loginError);
      });
  };

  const handleBack = () => {
    navigate("/basepage");
  };

  return (
    <div className="app-container">
      <div className="auth-container">
        <h2 className="auth-header">Login</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="userName">Username</label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="button-container">
            <button type="submit" className="btn-submit">
              Login
            </button>
            <button type="button" onClick={handleBack} className="btn-back">
              Home
            </button>
          </div>
        </form>
        <div className="signup-link">
          <p>
            Don't have an account? <a href="/register">Register here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
