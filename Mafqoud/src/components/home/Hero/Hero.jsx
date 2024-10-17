import React, { useState } from "react";
import CreatePost from "../../forms/postForm/CreatePost";
import "./hero.css";
import "animate.css";
import TrackVisibility from "react-on-screen";
import { useHistory } from "react-router-dom";

function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const history = useHistory();

  const toggleModal = () => {
    if (localStorage.getItem("token")) {
      setIsModalOpen(!isModalOpen);
    } else {
      alert("You Must Login First ");
    }
  };

  return (
    <>
      <section className="hero">
        <TrackVisibility>
          {({ isVisible }) => (
            <div
              className={
                isVisible ? "animate__animated animate__slideInUp" : ""
              }
            >
              <div className="container">
                <div className="row row-sm mt-1 gap-10 flex-direction-col justify-content align-items flex-direction-col">
                  <div className="rightside">
                    <h2>research platform</h2>
                    <h1>an easy-to-use website</h1>
                    <p>
                      to help parents of missing children find their loved ones.
                      Our website features a searchable database of missing
                      persons, as well as other helpful resources to aid in the
                      search.
                    </p>
                    <div className="row  align-items smail-btn btn-box">
                      <button className="btn herobtn-1" onClick={toggleModal}>
                        Create post
                      </button>
                      <button
                        className=" btn herobtn-2"
                        onClick={() => history.push("/feedback")}
                      >
                        Any questions?
                      </button>
                    </div>
                  </div>
                  <div className="leftside">
                    <img src="./images/Refer_a_friend.png" alt="Oops" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </TrackVisibility>
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

export default Hero;
