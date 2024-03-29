import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

export const Auth = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [error, setError] = useState("");
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const toggleForm = () => {
    setShowLogin(!showLogin);
    setError(""); // Clear error message when toggling forms
  };

  return (
    <div className="auth">
      {showLogin ? (
        <Login toggleForm={toggleForm} setError={setError} />
      ) : (
        <Register toggleForm={toggleForm} setError={setError} />
      )}
      <div className="toggle-form">
        {showLogin ? (
          <p style={{ textAlign: "center", maxLineswidth: "100%" }}>
            New to the site?{" "}
            <span
              style={{ cursor: "pointer", color: "#FF830F" }}
              onClick={toggleForm}
            >
              Register here
            </span>
          </p>
        ) : (
          <p style={{ textAlign: "center", maxWidth: "100%" }}>
            Already registered?{" "}
            <span
              style={{ cursor: "pointer", color: "#FF830F" }}
              onClick={toggleForm}
            >
              Login here
            </span>
          </p>
        )}
      </div>
      {error && <Alert severity="error">{error}</Alert>}
    </div>
  );
};

const Login = ({ toggleForm, setError }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await axios.post("https://mern-recipe-app-uz2k.onrender.com/auth/login", {
        username,
        password,
      });

      setCookies("access_token", result.data.token);
      window.localStorage.setItem("userID", result.data.userID);
      navigate("/");
    } catch (error) {
      setError("Invalid username or password."); // Set error message for invalid login attempt
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <TextField
          id="username"
          label="Username"
          variant="outlined"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          fullWidth
          required
        />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          fullWidth
          required
          sx={{ marginBlock: "1rem" }}
        />
        <Button
          variant="contained"
          sx={{
            ":hover": {
              backgroundColor: "#FFA500",
              borderColor: "#FFA500",
            },
            backgroundColor: "#FF830F",
          }}
          type="submit"
        >
          {" "}
          Login{" "}
        </Button>
      </form>
    </div>
  );
};

const Register = ({ toggleForm, setError }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("https://mern-recipe-app-uz2k.onrender.com/auth/register", {
        username,
        password,
      });
      alert("Registration Completed! Now login.");
      toggleForm(); // Switch to login form after successful registration
    } catch (error) {
      setError("Registration failed. Please try again."); // Set error message for registration failure
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <TextField
          id="username"
          label="Username"
          variant="outlined"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          fullWidth
          required
        />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          fullWidth
          required
          sx={{ marginBlock: "1rem" }}
        />
        <Button
          variant="contained"
          sx={{
            ":hover": {
              backgroundColor: "#FFA500",
              borderColor: "#FFA500",
            },
            backgroundColor: "#FF830F",
          }}
          type="submit"
        >
          {" "}
          Register{" "}
        </Button>{" "}
      </form>
    </div>
  );
};
