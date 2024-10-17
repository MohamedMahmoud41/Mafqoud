import React, { useState, useEffect } from "react";
import "./validPost.css";

const ValidPost = () => {
  const [postData, setPostData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const searchParams = new URLSearchParams(window.location.search);
    const postId = searchParams.get("id");

    const fetchPosts = () => {
      fetch(`https://api-3000.mafqoud.site/posts/${postId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setPostData(data.payload.post);
          console.log(data.payload.post);
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
        });
    };

    fetchPosts();
  }, []);

  if (!postData) {
    return <div>Loading...</div>; // Add a loading state while data is being fetched
  }

  return (
    <>
      <div className="postes">
        <div className="post post-mypost-width" key={postData.id}>
          <div className="poster-content">
            <div className="poster_handel">
              <div className="poster-logo-container">
                <img
                  src="./images/logo.png"
                  className="poster-logo"
                  alt="logo"
                ></img>
              </div>

              <div className="poster-details">
                <p className="poster-name">
                  {postData.user.firstName},{postData.user.lastName}
                </p>
                <p className="poster-date">
                  Posted on {postData.createdAt.substring(0, 10)}
                </p>

                <p className="loster-details">
                  <div className="child-name_div">
                    <b className="child-name">Child Name: </b>
                    {postData.childName}
                  </div>
                  <div className="poster-description">
                    {postData.description}
                  </div>
                </p>
                <div className="post_info">
                  <p className="loster-location">
                    Location:
                    <span className="location-tag">
                      {postData.town}, {postData.governerate}
                    </span>
                  </p>
                  <p className="loster-Email">
                    E-mail:
                    <a
                      href={`mailto:${postData.user.email}`}
                      className="email-tag"
                    >
                      {postData.user.email}
                    </a>
                  </p>
                  <p className="loster-Phone">
                    Phone Number:
                    <a
                      href={`tel:${postData.user.phone}`}
                      className="phone-tag"
                    >
                      {postData.user.phone}
                    </a>
                  </p>
                  <p className="loster-Status">
                    Child Status:
                    <span className="status-tag">{postData.status}</span>
                  </p>
                  <p className="loster-ageRange">
                    Age Range:
                    <span className="ageRange-tag">{postData.ageRange}</span>
                  </p>
                  <p className="loster-lossDate">
                    Loss Date:
                    <span className="lossDate-tag">{postData.lossDate}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {postData?.photos && postData?.photos.length > 0 && (
            <div className="loster-photo-container editphoto">
              <div className="image-wrapper">
                <img
                  src={`https://www.api-3000.mafqoud.site${postData.photos[0]}`}
                  alt="loster-img"
                  className="loster-photo"
                  crossOrigin="anonymous"
                  onClick={() =>
                    window.open(
                      `https://www.api-3000.mafqoud.site${postData.photos[0]}`,
                      "_blank"
                    )
                  }
                ></img>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ValidPost;
