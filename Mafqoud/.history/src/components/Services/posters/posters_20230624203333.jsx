import React, { useState, useEffect } from "react";
import "./posters.css";
import "animate.css";
import Modal from "react-modal";
import CreatePost from "../../post/CreatPost";
import TrackVisibility from "react-on-screen";
import { ageRange, allCities, cities, Government } from "../../data/Data";
import { useHistory } from "react-router-dom";

function Posters() {
  const history = useHistory();
  const [posters, setPosters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState({
    ageRange: "",
    government: "",
    allCities: "",
    lossDate: "",
    status: "",
  });

  useEffect(() => {
    fetchPosters();
  }, []);

  const fetchPosters = async () => {
    try {
      setLoading(true);
      setPosters([]);

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Authentication token not found in local storage.");
      }

      const response = await fetch(`https://api-3001.mafqoud.site/posts/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        throw new Error(
          "Authentication failed. Please check your credentials."
        );
      }

      const data = await response.json();
      setPosters(data.payload.posts);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Error fetching posters:", error);
    }
  };

  function generatePosters() {
    if (loading) {
      return <p className="loading">Loading...</p>;
    }

    return posters.map((poster, index) => (
      <div className="post" key={index}>
        <div className="poster-content">
          <div className="poster_handel">
            <div className="poster-logo-container">
              <img
                src={"./images/logo.png"}
                className="poster-logo"
                alt="Logo"
                onClick={() => history.push("/editPost")}
              ></img>
            </div>
            <div className="poster-details">
              <p className="poster-name">
                {poster.user.firstName},{poster.user.lastName}
              </p>
              <p className="poster-date">
                Posted on {getPosterDate(poster.createdAt)}
              </p>
              <p className="loster-details">
                <div className="child-name_div">
                  <b className="child-name">Child Name: </b>
                  {poster.childName}
                </div>
                <div className="poster-description">{poster.description}</div>
              </p>
              <div className="post_info">
                <p className="loster-location">
                  Location:
                  <span className="location-tag">
                    {poster.town}, {poster.governerate}
                  </span>
                </p>
                <p className="loster-Email">
                  E-mail:
                  <a href={`mailto:${poster.email}`} className="email-tag">
                    {poster.user.email}
                  </a>
                </p>
                <p className="loster-Phone">
                  Phone Number:
                  <a href={`tel:${poster.phone}`} className="phone-tag">
                    {poster.user.phone}
                  </a>
                </p>
                <p className="loster-Status">
                  Child Status:
                  <span className="status-tag">{poster.status}</span>
                </p>
                <p className="loster-ageRange">
                  Age Range:
                  <span className="ageRange-tag">{poster.ageRange}</span>
                </p>
                <p className="loster-lossDate">
                  Loss Date:
                  <span className="lossDate-tag">{poster.lossDate}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="loster-photo-container">
            {poster.status === "found" ? (
              <>
                <img
                  src={poster.photos[0]}
                  alt="loster-img"
                  className="loster-photo"
                />
                <img
                  src={poster.photos[1]}
                  alt="loster-img"
                  className="loster-photo"
                />
                <img
                  src={poster.photos[2]}
                  alt="loster-img"
                  className="loster-photo"
                />
              </>
            ) : (
              <img
                src={poster.photos[0]}
                alt="loster-img"
                className="loster-photo"
              />
            )}
          </div>
        </div>
      </div>
    ));
  }

  function getPosterDate(dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-EG", options);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchQuery((prevSearchQuery) => ({
      ...prevSearchQuery,
      [name]: value,
    }));
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Authentication token not found in local storage.");
      }

      const filteredData = await fetchFilteredData(token, searchQuery);
      setPosters(filteredData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Error fetching filtered posters:", error);
    }
  };
  const fetchFilteredData = async (token, filter) => {
    const { ageRange, government, allCities, lossDate, status } = filter;

    let apiUrl = `https://api-3001.mafqoud.site/posts/all`;

    const queryParams = [];

    if (ageRange) {
      queryParams.push(`ageRange=${ageRange}`);
    }
    if (government) {
      queryParams.push(`governerate=${government}`);
    }
    if (allCities) {
      queryParams.push(`town=${allCities}`);
    }
    if (lossDate) {
      queryParams.push(`lossDate=${lossDate}`);
    }
    if (status) {
      queryParams.push(`status=${status}`);
    }

    if (queryParams.length > 0) {
      apiUrl += `/?${queryParams.join("&")}`;
    }

    const response = await fetch(apiUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 401) {
      throw new Error("Authentication failed. Please check your credentials.");
    }

    const data = await response.json();
    return data.payload.posts;
  };

  const handleGetAll = async () => {
    setSearchQuery({
      ageRange: "",
      government: "",
      allCities: "",
      lossDate: "",
      status: "",
    });
    await fetchPosters();
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <section className="postes-section">
        <TrackVisibility offset={390}>
          {({ isVisible }) => (
            <div
              className={
                isVisible ? "animate__animated animate__backInLeft" : ""
              }
            >
              <div className="main-button">
                <div className="float-child1">
                  <h3 className="most-recent">
                    <i className="fa fa-history" aria-hidden="true"></i> Most
                    Recent
                  </h3>
                </div>
                <div className="poster_create_btn">
                  <button className="btn herobtn-1" onClick={openModal}>
                    Create post
                  </button>
                </div>
              </div>
              <div className="filter">
                <button onClick={handleGetAll}>All</button>
                <select
                  name="ageRange"
                  value={searchQuery.ageRange}
                  onChange={handleInputChange}
                  className="filter-age"
                >
                  <option value="">Select Age Range</option>
                  <option value="1-3">1-3</option>
                  <option value="4-6">4-6</option>
                  <option value="7-9">7-9</option>
                  <option value="10-12">10-12</option>
                </select>
                <select
                  name="government"
                  value={searchQuery.government}
                  onChange={handleInputChange}
                  className="filter-government"
                >
                  <option value="">Select Government</option>
                  {Government.map((governmentData) =>
                    Object.keys(governmentData).map((government) => (
                      <option key={government} value={government}>
                        {government}
                      </option>
                    ))
                  )}
                </select>
                <select
                  name="allCities"
                  value={searchQuery.allCities}
                  onChange={handleInputChange}
                  className="filter-city"
                >
                  <option value="">Select Cities</option>
                  {allCities.map((allCitiesData) =>
                    Object.keys(allCitiesData).map((allCities) => (
                      <option key={allCities} value={allCities}>
                        {allCities}
                      </option>
                    ))
                  )}
                </select>

                <input
                  type="date"
                  name="lossDate"
                  value={searchQuery.lossDate}
                  onChange={handleInputChange}
                  className="filter-lossdate"
                />
                <select
                  name="status"
                  value={searchQuery.status}
                  onChange={handleInputChange}
                  className="filter-status"
                >
                  <option value="">Select Status</option>
                  <option value="missing">Missing</option>
                  <option value="found">Found</option>
                </select>
                <button onClick={handleSearch}>Filter</button>
              </div>
            </div>
          )}
        </TrackVisibility>
        <div className="most-recent-container"></div>
        {generatePosters()}
      </section>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="API Form"
      >
        <CreatePost />
      </Modal>
    </>
  );
}

export default Posters;



