import React from "react";
import "./features.css";
import "animate.css";
import TrackVisibility from "react-on-screen";
function Features() {
  return (
    <>
      <section className="features">
        <div className="container container-1">
          <h2>features</h2>
          <TrackVisibility offset={490}>
            {({ isVisible }) => (
              <div
                className={
                  isVisible ? "animate__animated animate__zoomInRight" : ""
                }
              >
                <div className="row gap-10 justify-content align-items display-block mb-70">
                  <div className="card ">
                    <img
                      className="mb34"
                      src="./images/Group1.png"
                      alt="Group1"
                    />
                    <p>
                      <strong>Cloud Database.</strong>
                      <br />
                      that means you can access any information in anytime and
                      offer high availability, scalability, and security.
                    </p>
                  </div>
                  <div className="card">
                    <p className="mb34">
                      <strong>Ease of communication.</strong>
                      <br />
                      that means you can access any information in anytime and
                      offer high availability, scalability, and security.
                    </p>
                    <img src="./images/Group.png" alt="Group" />
                  </div>
                  <div className="card">
                    <img className="mb34" src="./images/Form.png" alt="Form" />
                    <p>
                      <strong>flexible and easy tools.</strong>
                      <br />
                      that means you can access any information in anytime and
                      offer high availability, scalability, and security.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </TrackVisibility>
        </div>
        <hr />
      </section>
    </>
  );
}

export default Features;
