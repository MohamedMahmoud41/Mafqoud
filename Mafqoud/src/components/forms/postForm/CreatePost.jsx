import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import Switch from "react-switch";
import "./CreatePost.css";
import { allCities, Government } from "../../data/Data";

function CreatPost() {
  const [images, setImages] = useState([]);
  const [selectedGovernment, setSelectedGovernment] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [isFoundChild, setIsFoundChild] = useState(false);
  const [childName, setChildName] = useState("");
  const [description, setDescription] = useState("");
  const [lossDate, setLossDate] = useState("");
  const [selectedAgeRange, setSelectedAgeRange] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = (event) => {
    const files = event.target.files;
    if (!isFoundChild) {
      setImages(Array.from(files).slice(0, 3));
    } else {
      setImages(Array.from(files).slice(0, 1));
    }
  };

  const handleGovernmentChange = (event) => {
    setSelectedGovernment(event.target.value);
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleToggle = (checked) => {
    if (checked) {
      setIsFoundChild(true);
      setImages([]);
      setIsLoading(false);
      setSelectedGovernment("");
      setSelectedCity("");
      setChildName("");
      setDescription("");
      setLossDate("");
      setSelectedAgeRange("");
    } else {
      setIsFoundChild(false);
      setImages([]);
      setIsLoading(false);
      setSelectedGovernment("");
      setSelectedCity("");
      setChildName("");
      setDescription("");
      setLossDate("");
      setSelectedAgeRange("");
    }
  };

  const sendStatusToAPI = (apiUrl) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("childName", childName);
    formData.append("description", description);
    formData.append("governerate", selectedGovernment);
    formData.append("town", selectedCity);
    formData.append("ageRange", selectedAgeRange);
    formData.append("lossDate", lossDate);

    if (!isFoundChild) {
      if (images.length === 0) {
        alert("Please select at least one image for the found child.");
        return;
      } else if (images.length !== 3) {
        alert(
          "Please select exactly three not less images for the found child."
        );
        console.log(images);
        return;
      } else if (images.length == 3) {
        formData.append("image1", images[0]);
        formData.append("image2", images[1]);
        formData.append("image3", images[2]);
      } else {
        alert("Wrong number of photos");
        return;
      }
    } else {
      if (images.length === 0) {
        alert("Please select an image for the missing child.");
        return;
      }
      formData.append("image1", images[0]);
    }

    setIsLoading(true);

    fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        resetFields();
      })
      .catch((error) => {
        setIsLoading(false);
        alert("There is an error, please check your internet connection");
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isFoundChild && images.length > 3) {
      alert("Please select only three images for the found child.");
      return;
    }

    sendStatusToAPI(
      isFoundChild
        ? "https://www.api-3000.mafqoud.site/posts/create/missing"
        : "https://www.api-3000.mafqoud.site/posts/create/found"
    );
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
    }
  };
  const resetFields = () => {
    setImages([]);
    setSelectedGovernment("");
    setSelectedCity("");
    setIsFoundChild(false);
    setChildName("");
    setDescription("");
    setLossDate("");
    setSelectedAgeRange("");
  };
  return (
    <div className="post-modal-content">
      {isLoading && (
        <div className="overlay-loading">
          <p className="post-under">
            Post under <span className="process-loading">&nbsp;Processing</span>
            , please wait
          </p>
          <div className="loading-animation"></div>
        </div>
      )}
      <div className="ToggleContainer">
        <span className="toggel-span">
          {isFoundChild ? "Add Lost Child" : "Add Found Child"}
        </span>
        <Switch
          onChange={handleToggle}
          checked={isFoundChild}
          onColor="#3c8edf"
          uncheckedIcon={false}
          checkedIcon={false}
        />
      </div>
      <div className="CreatPost">
        <h2 className="CreatPostTitle">
          <i className="fa-solid fa-file-pen"></i> Create Post
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="FormContainer">
            <label htmlFor="name" className="LabelForm">
              Child Name {!isFoundChild ? "(Optional)" : "(Required)"}
            </label>
            <input
              type="text"
              id="childName"
              rows={4}
              onKeyDown={handleKeyPress}
              name="name"
              placeholder="Enter child name"
              className="InputForm"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              required={isFoundChild}
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
              className="CaptionHeight-create InputForm"
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
                <option className="option-select" value="">
                  Select Government
                </option>
                {Object.keys(Government[0]).map((gov) => (
                  <option key={gov} value={gov}>
                    {gov}
                  </option>
                ))}
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
                <option className="option-select" value="">
                  Select city
                </option>
                {Object.keys(allCities[0]).map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
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
                <option className="option-select" value="">
                  Select Age Range
                </option>
                <option className="option-select" value="1-3">
                  1-3
                </option>
                <option className="option-select" value="4-6">
                  4-6
                </option>
                <option className="option-select" value="7-9">
                  7-9
                </option>
                <option className="option-select" value="10-12">
                  10-12
                </option>
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
          <div className="FormContainer">
            <label htmlFor="photo" className="LabelForm">
              Photos (Exactly {isFoundChild ? 1 : 3})
            </label>
            <div className="InputPhotoForm">
              <input
                type="file"
                id="photo"
                name="photo"
                accept="image/*"
                multiple={!isFoundChild}
                onChange={(event) => handleImageUpload(event)}
                className="PhotoForm"
              />
            </div>
          </div>
          <br />
          <br />
          <hr />
          <div className="FormButtons">
            <input
              type="submit"
              value={isFoundChild ? "Add Lost Child" : "Add Found Child"}
              className="ButtonForm"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatPost;
