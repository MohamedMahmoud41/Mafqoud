import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "./editPost.css";
import { allCities, Government } from "../data/Data";
import { useLocation } from "react-router-dom";
function EditPost() {
  const [selectedGovernment, setSelectedGovernment] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [childName, setChildName] = useState("");
  const [lossDate, setLossDate] = useState("");
  const [description, setDescription] = useState("");
  const [selectedAgeRange, setSelectedAgeRange] = useState("");
  const [postId, setPostId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [token, setToken] = useState("");
  const location = useLocation();
  const { postData } = location.state;

  useEffect(() => {
    if (postData) {
      setSelectedGovernment(postData.governerate);
      setSelectedCity(postData.town);
      setChildName(postData.childName);
      setLossDate(postData.lossDate);
      setDescription(postData.description);
      setSelectedAgeRange(postData.ageRange);
      setIsLoading(false);
    }
  }, [postData]);

  const handleGovernmentChange = (event) => {
    setSelectedGovernment(event.target.value);
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const postId = searchParams.get("id");

    setPostId(postId);

    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        setToken(token);
        const apiUrl = `https://api-3000.mafqoud.site/posts/${postId}`;
        const response = await fetch(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const postData = await response.json();
          setSelectedGovernment(postData.governerate);
          setSelectedCity(postData.town);
          setChildName(postData.childName);
          setLossDate(postData.lossDate);
          setDescription(postData.description);
          setStatus(postData.status);
          setSelectedAgeRange(postData.ageRange);
          setIsLoading(false);
        } else {
          console.error("Error fetching post data:", response.status);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching post data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [postId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const apiUrl = `https://api-3000.mafqoud.site/posts/${postId}`;

    const updatedData = {
      childName: childName,
      ageRange: selectedAgeRange,
      governerate: selectedGovernment,
      town: selectedCity,
      lossDate: lossDate,
      description: description,
      status: status,
    };

    axios
      .put(apiUrl, updatedData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        alert("Edit successful");
      })
      .catch(() => {
        alert("Error updating post");
      });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="EditPost">
        <h2 className="CreatPostTitles">
          <i className="fa-solid fa-file-pen"></i> Edit Post
        </h2>
        <form onSubmit={handleSubmit} id="apiForm" className="CreatPostForm">
          <div className="FormContainers">
            <label htmlFor="name" className="LabelForms">
              Child Name
            </label>
            <input
              type="text"
              id="childName"
              name="name"
              placeholder="Enter child name"
              className="InputForms"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
            />
          </div>
          <div className="FormContainers">
            <label htmlFor="caption" className="LabelForms zero">
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
              className="InputForms CaptionHeight"
            />
          </div>
          <div className="data_container">
            <div className="data_container-grid">
              <label htmlFor="government" className="LabelForms-grid">
                Government
              </label>
              <select
                id="government"
                name="government"
                value={selectedGovernment}
                onChange={handleGovernmentChange}
                className="InputForms-grid"
              >
                <option value="">Select Government</option>
                <option value="cairo">Cairo</option>
              </select>
            </div>
            <div className="data_container-grid">
              <label htmlFor="city" className="LabelForms-grid fix-labels">
                City
              </label>
              <select
                id="city"
                name="city"
                value={selectedCity}
                onChange={handleCityChange}
                className="InputForms-grid"
              >
                <option value="">Select City</option>
                <option value="">Select City</option>
                <option value="fifth settlement">Fifth Settlement</option>
                <option value="nasr city">Nasr City</option>
                <option value="new cairo">New Cairo</option>
                <option value="el obour city">El Obour City</option>
                <option value="badr city">Badr City</option>
                <option value="10th of ramadan city">10th of Ramadan</option>
              </select>
            </div>
            <div className="data_container-grid">
              <label htmlFor="ageRange" className="LabelForms-grid">
                Age Range
              </label>
              <select
                id="ageRange"
                name="ageRange"
                value={selectedAgeRange}
                onChange={(e) => setSelectedAgeRange(e.target.value)}
                className="InputForms-grid"
              >
                <option value="">Select Age Range</option>
                <option value="1-3">1-3</option>
                <option value="4-6">4-6</option>
                <option value="7-9">7-9</option>
                <option value="10-12">10-12</option>
              </select>
            </div>
            <div className="data_container-grid">
              <label htmlFor="lossDate" className="LabelForms-grid fix-labels">
                Loss Date
              </label>
              <input
                type="date"
                id="lossDate"
                name="lossDate"
                className="InputForms-grid"
                value={lossDate}
                onChange={(e) => setLossDate(e.target.value)}
              />
            </div>
          </div>

          <br />
          <hr className="line" />
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
