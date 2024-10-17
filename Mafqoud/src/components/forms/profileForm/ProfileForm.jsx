import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./profile.css";
import { useHistory } from "react-router-dom";

function ProfileForm({ handleProfile }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [address, setAddress] = useState("");
  const history = useHistory();

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          // Handle case when token is not available
          return;
        }

        const response = await fetch(
          "https://api-3001.mafqoud.site/auth/info",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          const { user } = data.payload;

          setFirstName(user.firstName);
          setLastName(user.lastName);
          setFullName(`${user.firstName} ${user.lastName}`);
          setBirthDate(user.birthDate);
          setAddress(user.address);
        } else {
          // Handle case when the API request fails
          toast.error("Failed to fetch user information");
        }
      } catch (error) {
        // Handle error case
        toast.error("Network Error");
      }
    };

    fetchUserInfo();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (firstName.length < 3) {
      toast.error("First name must be at least 3 characters long");
      return;
    }

    if (lastName.length < 3) {
      toast.error("Last name must be at least 3 characters long");
      return;
    }
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        // Handle case when token is not available
        return;
      }

      const response = await fetch("https://api-3001.mafqoud.site/auth/info", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "PUT",
        body: JSON.stringify({
          firstName,
          lastName,
          birthDate,
          address,
        }),
      });

      if (response.ok) {
        setShowSuccessPopup(true);
        toast.success("Edit successful!");
      } else {
        toast.error("Edit failed!");
      }
    } catch (error) {
      toast.error("Network Error");
    }
  };

  const handleSuccessPopupClose = () => {
    setShowSuccessPopup(false);
  };

  return (
    <div className="modal-content">
      <ToastContainer onClose={handleSuccessPopupClose} />
      <form className="signup" onSubmit={handleSubmit}>
        <div className="user-container">
          <img
            className="user-img"
            src={"./images/logo.png"}
            alt="Oops"
            title="My Posts"
          />
          <p className="user-name">{fullName}</p>
        </div>

        <div className="card-body p-5 text-center">
          <h3 className="mt-5">Profile Settings</h3>

          <div className="form-outline inline me-10 mb-4">
            <div className="lable-box">
              <label htmlFor="firstname">Fisrt Name</label>
            </div>
            <input
              type="text"
              name="firstname"
              min={3}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="form-control form-control-lg form-placeholder signup-name name-space"
              placeholder="First Name"
              required
            />
          </div>

          <div className="form-outline inline me-10 mb-4">
            <div className="lable-box">
              <label htmlFor="lastname">Last Name</label>
            </div>
            <input
              type="text"
              name="lastname"
              min={3}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="form-control form-control-lg form-placeholder signup-name name-space"
              placeholder="Last Name"
              required
            />
          </div>

          <div className="form-outline mb-4">
            <div className="lable-box">
              <label htmlFor="birthDate">DOB</label>
            </div>
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
            <div className="lable-box">
              <label htmlFor="address">Address</label>
            </div>
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

          <button
            className="btn btn-primary btn-lg btn-block btn-edit"
            type="submit"
          >
            Edit Info
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfileForm;
