import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./signup.css";

function SignUpForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [address, setAddress] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const validatePassword = (password) => {
    // Check for at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
      return false;
    }

    // Check for at least one lowercase letter
    if (!/[a-z]/.test(password)) {
      return false;
    }

    // Check length constraints
    if (password.length < 8 || password.length > 20) {
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Perform field validations
    if (firstName.length < 3) {
      toast.error("First name must be at least 3 characters long");
      return;
    }

    if (lastName.length < 3) {
      toast.error("Last name must be at least 3 characters long");
      return;
    }

    if (phone.length < 10 || phone.length > 11) {
      toast.error("Phone number must be between 10 and 11 characters");
      return;
    }
    if (!validatePassword(password)) {
      toast.error(
        "Password must be between 8 and 20 characters and contain at least one uppercase letter and one lowercase letter"
      );
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        "https://api-3001.mafqoud.site/auth/register",
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            firstName,
            lastName,
            birthDate,
            address,
            nationalId,
            email,
            password,
            phone,
          }),
        }
      );
      if (response.ok) {
        setFirstName("");
        setLastName("");
        setBirthDate("");
        setAddress("");
        setNationalId("");
        setEmail("");
        setPassword("");
        setPhone("");
      } else if (response.status === 422) {
        toast.error("Email already exists");
      } else {
        toast.error("Signup failed!");
      }
    } catch (error) {
      toast.error("Network Error");
    }
  };

  return (
    <div className="modal-content">
      <ToastContainer />
      <form className="signup" onSubmit={handleSubmit}>
        <div className="logo-container">
          <img
            className="logo-img"
            src="./images/Horizontal_logo.png"
            alt="Oops"
          />
        </div>

        <div className="card-body p-5 text-center">
          <h4 className="mb-h4 mb-5 mt-5">Let’s set up your account</h4>
          <div className="row gap-10">
            <div className="form-outline inline me-10 mb-4">
              <input
                type="text"
                name="firstName"
                min={3}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="form-control form-control-lg form-placeholder signup-name name-space"
                placeholder="First Name"
                required
              />
            </div>

            <div className="form-outline inline me-10 mb-4">
              <input
                type="text"
                name="lastName"
                min={3}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="form-control form-control-lg form-placeholder signup-name name-space "
                placeholder="Last Name"
                required
              />
            </div>
          </div>
          <div className="form-outline mb-4">
            <input
              type="date"
              value={birthDate}
              id="typeDateX-2"
              onChange={(e) => setBirthDate(e.target.value)}
              name="birthDate"
              className="form-control form-control-lg"
              placeholder="Date of birth"
              required
            />
          </div>
          <div className="form-outline mb-4">
            <input
              type="address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              id="typeAddressX-2"
              className="form-control form-control-lg form-placeholder"
              placeholder="Address"
              required
            />
          </div>
          <div className="form-outline mb-4">
            <input
              type="text"
              name="nationalId"
              value={nationalId}
              onChange={(e) => setNationalId(e.target.value)}
              id="typeNationalIdX-2"
              className="form-control form-control-lg form-placeholder"
              placeholder="National ID"
              required
            />
          </div>
          <div className="form-outline mb-4">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="typeEmailX-2"
              className="form-control form-control-lg form-placeholder"
              placeholder="Email"
              required
            />
          </div>

          <div className="form-outline mb-4">
            <input
              type="phone"
              id="phone"
              name="phone"
              min={10}
              max={11}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control form-control-lg form-placeholder"
              placeholder="Phone"
              required
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
          <div className="form-outline mb-4 confirm-password-field">
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              id="typeConfirmPasswordX-2"
              className="form-control form-control-lg form-placeholder password-input"
              placeholder="Confirm Password"
              required
            />
            <span
              className="confirm-password-toggle-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🐵" : "🙈"}
            </span>
          </div>

          <button
            className="btn btn-primary btn-lg btn-block btn-sign"
            type="submit"
          >
            Sign up
          </button>
          <p className="no-account">
            Don't have an Account? <a className="login-switch">Login</a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;
