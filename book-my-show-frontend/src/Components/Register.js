import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [role, setRole] = useState("USER");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleNext = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const registerData = {
      firstName,
      lastName,
      email,
      phoneNumber,
      userName,
      password,
      role,
      isActive,
    };

    axios
      .post("http://localhost:8080/api/register", registerData)
      .then(() => {
        alert("User registered successfully");
        navigate("/login");
      })
      .catch(() => {
        setError("Error during registration");
      });
  };

  return (
    <div className="app-container">
      <div className="auth-container">
        <h2 className="auth-header">Register</h2>
        {error && <div className="error">{error}</div>}

        {step === 1 && (
          <form onSubmit={handleNext}>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="text"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <div className="button-group">
              <button
                type="button"
                className="btn-back"
                onClick={() => navigate("/")}
              >
                Home
              </button>
              <button type="submit" className="btn-submit">
                Next
              </button>
            </div>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleRegister}>
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
            <div className="button-group">
              <button
                type="button"
                className="btn-back"
                onClick={() => setStep(1)}
              >
                Back
              </button>
              <button type="submit" className="btn-submit">
                Register
              </button>
            </div>
          </form>
        )}

        <div className="signIn-link">
          <p>
            Already have an account? <a href="/login">Login here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
