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

          <div>
            <div className="row gap-10 justify-content align-items display-block mb-70">
              <div className="card ">
                <img className="mb34" src="./images/Group1.png" alt="Group1" />
                <p>
                  <strong>Cloud Database.</strong>
                  <br />
                  that means you can access any information in anytime and offer
                  high availability, scalability, and security.
                </p>
              </div>
              <div className="card">
                <p className="mb34">
                  <strong>Ease of communication.</strong>
                  <br />
                  Easy ways to communicate, to interact with the user and to
                  gain more information
                </p>
                <img src="./images/Group.png" alt="Group" />
              </div>
              <div className="card">
                <img className="mb34" src="./images/Form.png" alt="Form" />
                <p>
                  <strong>flexible and easy tools.</strong>
                  <br />
                  you can use some filters to narrow your search scope, and easy
                  tools to create a posts.
                </p>
              </div>
            </div>
          </div>
        </div>
        <hr />
      </section>
    </>
  );
}

export default Features;
