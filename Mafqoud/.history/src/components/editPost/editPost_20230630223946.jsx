import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "./editPost.css";
import { ageRange, cities, Government } from "../data/Data";

function EditPost() {
  const [selectedGovernment, setSelectedGovernment] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [citiesByGovernment, setCitiesByGovernment] = useState([]);
  const [childName, setChildName] = useState("");
  const [lossDate, setLossDate] = useState("");
  const [description, setDescription] = useState("");
  const [selectedAgeRange, setSelectedAgeRange] = useState("");
  const [postId, setPostId] = useState("");

  useEffect(() => {
    if (selectedGovernment) {
      const governmentCities = cities.find((governmentData) =>
        governmentData.hasOwnProperty(selectedGovernment)
      );
      if (governmentCities) {
        setCitiesByGovernment(governmentCities[selectedGovernment]);
        setSelectedCity("");
      }
    }
  }, [selectedGovernment]);

  const handleGovernmentChange = (event) => {
    setSelectedGovernment(event.target.value);
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleAgeRangeChange = (event) => {
    setSelectedAgeRange(event.target.value);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const postId = searchParams.get("id"); // Extract the value of the "id" parameter

    setPostId(postId);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const apiUrl = `https://api-3000.mafqoud.site/posts/${postId}`;

    const formData = {
      childName: childName,
      ageRange: selectedAgeRange,
      governerate: selectedGovernment,
      town: selectedCity,
      lossDate: lossDate,
      description: description,
      status: "found", // You may modify this as needed
    };

    axios
      .put(apiUrl, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Replace token with the actual token value
        },
      })
      .then(() => {
        // Handle successful update if needed
        alert("Edit successfully ");
      })
      .catch(() => {
        // Handle update error if needed
        // console.error("Error updating post:", error);
        alert("Error updating post ");
      });
  };

  return (
    <>
      <div className="EditPost">
        <h2 className="CreatPostTitle">
          <i className="fa-solid fa-file-pen"></i> Edit Post
        </h2>
        <form onSubmit={handleSubmit} id="apiForm" className="CreatPostForm">
          <div className="FormContainer">
            <label htmlFor="name" className="LabelForm">
              Child Name
            </label>
            <input
              type="text"
              id="childName"
              rows={4}
              name="name"
              placeholder="Enter child name"
              className="InputForm"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
            />
          </div>
          <div className="FormContainer">
            <label htmlFor="caption" className="LabelForm zero">
              Add Caption
            </label>
            <textarea
              type="text"
              id="caption"
              name="caption"
              placeholder="Caption"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="InputForm CaptionHeight"
            />
          </div>
          <div className="data_container">
            <div className="data_container-grid">
              <label htmlFor="government" className="LabelForm-grid">
                Government
              </label>
              <select
                id="government"
                name="government"
                value={selectedGovernment}
                onChange={handleGovernmentChange}
                className="InputForm-grid"
              >
                <option value="">Select Government</option>
                <option value="cairo">Cairo</option>
                <option value="sharqia">Sharqia</option>
                <option value="giza">Giza</option>
              </select>
            </div>
            <div className="data_container-grid">
              <label htmlFor="city" className="LabelForm-grid fix-label">
                City
              </label>
              <select
                id="city"
                name="city"
                value={selectedCity}
                onChange={handleCityChange}
                className="InputForm-grid"
              >
                <option value="">Select City</option>
                <option value="nasr city">Nasr City</option>
                <option value="10th of ramadan">10th of Ramadan</option>
                <option value="alex">alex</option>
              </select>
            </div>
            <div className="data_container-grid">
              <label htmlFor="ageRange" className="LabelForm-grid">
                Age Range
              </label>
              <select
                id="ageRange"
                name="ageRange"
                value={selectedAgeRange}
                onChange={(e) => setSelectedAgeRange(e.target.value)}
                className="InputForm-grid"
              >
                <option value="">Select Age Range</option>
                <option value="1-3">1-3</option>
                <option value="4-6">4-6</option>
                <option value="7-9">7-9</option>
                <option value="10-12">10-12</option>
              </select>
            </div>
            <div className="data_container-grid">
              <label htmlFor="lossDate" className="LabelForm-grid fix-label">
                Loss Date
              </label>
              <input
                type="date"
                id="lossDate"
                name="lossDate"
                className="InputForm-grid"
                value={lossDate}
                onChange={(e) => setLossDate(e.target.value)}
              />
            </div>
          </div>

          <br />
          <hr />
          <div className="FormButtons">
            <button type="submit" className="ButtonForm">
              Edit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditPost;
