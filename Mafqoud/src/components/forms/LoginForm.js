import React, { useState, useEffect } from "react";
import axios from "axios";
import "./login.css";
import "./Authentication";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [closed, setClosed] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // New state variable

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://api-3001.mafqoud.site/auth/login",
        {
          email,
          password,
        }
      );
      const token = response.data.payload.token;
      localStorage.setItem("token", token);
      setEmail("");
      setPassword("");
      handleLogin();
      setClosed(true);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("Invalid email or password");
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  if (closed) {
    return null;
  }

  return (
    <div className="modal-content">
      <ToastContainer />
      <form className="login" onSubmit={handleSubmit}>
        <div className="logo-container">
          <img
            src="./images/Horizontal_logo.png"
            alt="Oops"
            className="logo-image-form"
          />
        </div>

        <div className="card-body p-5 text-center">
          <h3 className="ftext">Great to have you back!</h3>
          <div className="form-outline mb-4">
            <input
              type="email"
              id="typeEmailX-2"
              className="form-control form-control-lg form-placeholder"
              placeholder="Email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="form-outline mb-4 password-field">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              id="typePasswordX-2"
              onChange={(e) => setPassword(e.target.value)}
              className="form-control form-control-lg form-placeholder password-input"
              placeholder="Password"
              required
            />
            <span
              className="password-toggle-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🐵" : "🙈"}
            </span>
          </div>
          <button
            className="btn btn-primary btn-lg btn-block btn-login"
            type="submit"
          >
            Log in
          </button>
          <p className="no-account">
            Don't have an Account? <a className="signup-switch">Sign Up</a>
          </p>
          <hr className="my-4" />
          <p className="form-footer">
            Mafqoud collects and uses personal data in accordance with our
            Privacy Policy. By creating an account, you agree to our Terms &
            Conditions.
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
