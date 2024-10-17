import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignupForm";

function Authentication() {
  const [formType, setFormType] = useState("login");

  const handleSwitchForm = () => {
    setFormType(formType === "login" ? "signup" : "login");
  };

  return (
    <div>
      {formType === "login" ? (
        <LoginForm onSwitchForm={handleSwitchForm} />
      ) : (
        <SignUpForm onSwitchForm={handleSwitchForm} />
      )}
    </div>
  );
}

export default Authentication;
