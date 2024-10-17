import React, { useState } from "react";
import "./posters.css";
import "animate.css";
import TrackVisibility from "react-on-screen";

function Posters() {
  const [count, setCount] = useState(3);
  const [posters, setPosters] = useState(generatePosters(count));
  function generatePosters(count) {
    let posters = [];
    for (let i = 0; i < count; i++) {
      posters.push(
        <div className="post" key={i}>
          <TrackVisibility offset={390}>
            {({ isVisible }) => (
              <div
                className={
                  isVisible ? "animate__animated animate__slideInLeft" : ""
                }
              >
                <div className="poster-content">
                  <div className="poster-logo-container">
                    <img
                      src={"./images/logo.png"}
                      className="poster-logo"
                    ></img>
                  </div>
                  <div className="poster-details">
                    <p className="poster-name">{"John Doe"}</p>
                    <p className="poster-date">
                      Posted on {"September"} {"3"}, {"2022"}
                    </p>
                    <p className="loster-details">
                      {
                        "I have lost this child in the first gathering the rotation of the youth tray, he is about 8 years old, and he is wearing blue pants and a brown T-shirt."
                      }
                    </p>

                    <p className="loster-location">
                      Location:
                      <span className="location-tag">
                        {"Nasr City"}, {"Cairo"}
                      </span>
                    </p>
                    <p className="loster-Phone">
                      Phone Number:
                      <a type="tell:+201002003004" className="phone-tag">
                        {"+201002003004"}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </TrackVisibility>
          <TrackVisibility offset={390}>
            {({ isVisible }) => (
              <div
                className={
                  isVisible ? "animate__animated animate__slideInRight" : ""
                }
              >
                <div className="loster-photo-container">
                  <img
                    src={"./images//loster.png"}
                    alt="loster-img"
                    className="loster-photo"
                  ></img>
                </div>
              </div>
            )}
          </TrackVisibility>
        </div>
      );
    }
    return posters;
  }

  function handleBrowseMore() {
    const newCount = count + 3;
    const newPosters = generatePosters(newCount);
    setCount(newCount);
    setPosters(newPosters);
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }

  return (
    <>
      <section className="postes-section">
        <TrackVisibility offset={390}>
          {({ isVisible }) => (
            <div
              className={
                isVisible ? "animate__animated animate__rotateInDownLeft" : ""
              }
            >
              <h3 className="most-recent">
                <i class="fa fa-history" aria-hidden="true"></i> Most Recent
              </h3>
            </div>
          )}
        </TrackVisibility>
        {posters}
        <div className="browse-more-container">
          <TrackVisibility>
            {({ isVisible }) => (
              <div
                className={
                  isVisible ? "animate__animated animate__pulse" : ""
                }
                style={{ animationIterationCount: 3 }}
              >
                <button className="browse-more" onClick={handleBrowseMore}>
                  Browse More
                </button>
              </div>
            )}
          </TrackVisibility>
        </div>
      </section>
    </>
  );
}

export default Posters;
