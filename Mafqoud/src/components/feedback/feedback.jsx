import React, { useState } from "react";
import "./feedback.css";
function Feedback() {
  <h3 className="ftext">Great to have you back!</h3>;
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailSubject = encodeURIComponent("Feedback");
    const emailBody = encodeURIComponent(`
    Full Name: ${fullName}
    Phone Number: ${phoneNumber}
    Email: ${email}
    Message: ${message}
  `);

    window.location.href = `mailto:mafqoudsite@gmail.com?subject=${emailSubject}&body=${emailBody}`;
  };

  return (
    <div className="form-body">
      <h3 className="head-text">FeedBack</h3>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form-feedback">
          <input
            className="form-border"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full Name"
          />
          <input
            className="form-border"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            className="form-border"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Phone Number"
          />

          <textarea
            className="form-textarea"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Leave Us a Massage"
          ></textarea>
          <button type="submit" className="send-button">
            Send
          </button>
        </form>
      </div>{" "}
    </div>
  );
}

export default Feedback;
