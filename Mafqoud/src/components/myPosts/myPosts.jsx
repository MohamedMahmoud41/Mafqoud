import React, { useState, useEffect } from "react";
import "./myPosts.css";
import { useHistory } from "react-router-dom";

const MyPost = () => {
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [postData, setPostData] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false); // Track deletion status
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchPosts = () => {
      fetch("https://api-3000.mafqoud.site/posts/myposts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setPostData(data.payload.posts);
          console.log(data);
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    fetchPosts();
  }, [isDeleting]);

  const openDropdown = (postId) => {
    setOpenDropdownId(postId);
  };

  const closeDropdown = () => {
    setOpenDropdownId(null);
  };

  const handleEditClick = (postId) => {
    const selectedPost = postData.find((post) => post.id === postId);
    history.push({
      pathname: `/editPost?id=${postId}`,
      state: { postData: selectedPost },
    });
  };

  const handleDeleteClick = (postId) => {
    const token = localStorage.getItem("token");

    setIsDeleting(true);

    fetch(`https://api-3000.mafqoud.site/posts/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.msg === "post deleted") {
          setDeleteMessage("Post not deleted.");
          setTimeout(() => {
            setDeleteMessage("");
          }, 3000);
        } else {
          setDeleteMessage("Post deleted successfully.");
          setTimeout(() => {
            setDeleteMessage("");
          }, 3000);
        }
      })
      .catch((error) => {
        setDeleteMessage("Error deleting post");
        setTimeout(() => {
          setDeleteMessage("");
        }, 3000);
      })
      .finally(() => {
        setIsDeleting(false); // Set deletion status to false
      });
  };

  return (
    <>
      {deleteMessage && <div className="delete-message">{deleteMessage}</div>}
      {isLoading ? (
        <div className="loading-animation-myposts"></div>
      ) : postData && postData.length > 0 ? (
        <div className="postes">
          <h3 className="most-mypost">
            <i className="fas fa-book" aria-hidden="true"></i> My Posts
          </h3>
          {postData.map((post) => (
            <div className="post post-mypost-width" key={post.id}>
              <div className="poster-content">
                <div className="poster_handel">
                  <div className="poster-logo-container">
                    <img
                      src={"./images/logo.png"}
                      className="poster-logo"
                    ></img>
                  </div>

                  <div className="poster-details">
                    <p className="poster-name">
                      {post.user.firstName} {post.user.lastName}
                    </p>
                    <p className="poster-date">
                      Posted on {post.createdAt.substring(0, 10)}
                    </p>

                    <p className="loster-details">
                      <div className="child-name_div">
                        <b className="child-name">Child Name: </b>
                        {post.childName}
                      </div>
                      <div className="poster-description">
                        {post.description}
                      </div>
                    </p>
                    <div className="post_info">
                      <p className="loster-location">
                        Location:
                        <span className="location-tag">
                          {post.town}, {post.governerate}
                        </span>
                      </p>
                      <p className="loster-Email">
                        E-mail:
                        <a
                          href={`mailto:${post.user.email}`}
                          className="email-tag"
                        >
                          {post.user.email}
                        </a>
                      </p>
                      <p className="loster-Phone">
                        Phone Number:
                        <a
                          href={`tel:${post.user.phone}`}
                          className="phone-tag"
                        >
                          {post.user.phone}
                        </a>
                      </p>
                      <p className="loster-Status">
                        Child Status:
                        <span className="status-tag">{post.status}</span>
                      </p>
                      <p className="loster-ageRange">
                        Age Range:
                        <span className="ageRange-tag">{post.ageRange}</span>
                      </p>
                      <p className="loster-lossDate">
                        Loss Date:
                        <span className="lossDate-tag">{post.lossDate}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="dropdown">
                <button
                  className="dropbtn"
                  onClick={() => {
                    if (openDropdownId === post.id) {
                      closeDropdown();
                    } else {
                      openDropdown(post.id);
                    }
                  }}
                >
                  . . .
                </button>
                <div
                  className={`dropdown-content ${
                    openDropdownId === post.id ? "" : "hidden"
                  }`}
                >
                  <a onClick={() => handleEditClick(post.id)}>Edit</a>
                  <a onClick={() => handleDeleteClick(post.id)}>Delete</a>
                </div>
              </div>

              {post.photos && post.photos.length > 0 && (
                <div className="loster-photo-container editphoto">
                  <div className="image-wrapper">
                    <img
                      src={`https://www.api-3000.mafqoud.site${post.photos[0]}`}
                      alt="loster-img"
                      className="loster-photo"
                      crossOrigin="anonymous"
                      onClick={() =>
                        window.open(
                          `https://www.api-3000.mafqoud.site${post.photos[0]}`,
                          "_blank"
                        )
                      }
                    ></img>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="no-posts">
          <p className="no-posts-text">There are no posts &#128549;</p>
        </div>
      )}
    </>
  );
};

export default MyPost;
