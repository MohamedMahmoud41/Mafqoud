import React, { useState } from "react";
import Modal from "react-modal";
import CreatePost from "../../forms/postForm/CreatePost";
import "./services.css";
import "animate.css";
import TrackVisibility from "react-on-screen";

function Services() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    if (localStorage.getItem("token")) {
      setIsModalOpen(!isModalOpen);
    } else {
      alert("You Must Login First ");
    }
  };
  return (
    <>
      <section className="services">
        <div className="container">
          <h2>services</h2>
          <div className="row flex-direction  gap-105 justify-content align-items mb-70 ">
            <div className="leftSideText text-1">
              <TrackVisibility offset={900}>
                {({ isVisible }) => (
                  <div
                    className={
                      isVisible ? "animate__animated animate__slideInLeft" : ""
                    }
                  >
                    <h3>Find alost child</h3>
                    <p>
                      Searching for a missing child will allow the user to
                      browse through the database of missing persons and contact
                      the appropriate authorities if a match is found. We
                      understand the urgency and importance of finding a missing
                      child and are here to provide the necessary support, We
                      offer two main features on our website.
                    </p>
                  </div>
                )}
              </TrackVisibility>
            </div>
            <div className="rightSideImage image-1">
              <div className="bg-color"></div>
              <img src="./images/Share_location.png" alt="" />
            </div>
          </div>
          <div className="row  flex-direction gap-105 justify-content align-items mb-70">
            <div className="leftSideImage">
              <div className="bg-color"></div>
              <img src="./images/Frame.png" alt="" />
            </div>
            <TrackVisibility offset={99999}>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__slideInRight" : ""
                  }
                >
                  <div className="rightSideText">
                    <h3>post alost child</h3>
                    <p>
                      Posting a missing child will allow parents to reach out to
                      the community to help find their child. We understand the
                      urgency and importance of finding a missing child and are
                      here to provide the necessary support, We offer two main
                      features on our website.
                    </p>
                  </div>
                </div>
              )}
            </TrackVisibility>
          </div>
          <TrackVisibility offset={99999}>
            {({ isVisible }) => (
              <div
                className={isVisible ? "animate__animated animate__pulse" : ""}
              >
                <button className="btn servicesbtn-1" onClick={toggleModal}>
                  Create Post
                </button>
              </div>
            )}
          </TrackVisibility>
        </div>
      </section>

      {isModalOpen && (
        <div className="post-modal">
          <div onClick={toggleModal} className="overlay"></div>
          <CreatePost />
        </div>
      )}
    </>
  );
}

export default Services;
