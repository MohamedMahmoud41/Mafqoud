import React, { useState, useEffect } from "react";
import "./header.css";
import axios from "axios";
import { nav } from "../../data/Data";
import LoginForm from "../../forms/LoginForm";
import Signup from "../../forms/SignupForm";
import ProfileForm from "../../forms/profileForm/ProfileForm";
import { FaRegUser } from "react-icons/fa";
import { FaSun, FaMoon } from "react-icons/fa";
import { toast } from "react-toastify";
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom";

const Header = () => {
  const [navlist, setnavlist] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [modal, setModal] = useState(false);
  const [signModal, setSingnModal] = useState(false);
  const [userModal, setUserModal] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const history = useHistory();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // If token exists, perform auto-login
      autoLogin(token);
    }
  }, []);

  const autoLogin = async (token) => {
    try {
      const response = await axios.get(
        "https://api-3001.mafqoud.site/auth/info",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const user = response.data.payload.user;
      setUserData(user);
      setIsAuthenticated(true);
    } catch (error) {
      localStorage.removeItem("token"); // Remove invalid token from local storage
      setIsAuthenticated(false);
      setUserData(null);
    }
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const toggleSignModal = () => {
    setSingnModal(!signModal);
  };

  const toggleUserModal = () => {
    setUserModal(!userModal);
  };

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark-class");
    } else {
      setTheme("light");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.className = theme;
  }, [theme]);
  const handleLogin = () => {
    setIsAuthenticated(true);
    setModal(false); // Close the login modal
  };
  const handleSignup = () => {
    setIsAuthenticated(true);
    setSingnModal(false); // Close the signup modal
    setModal(true);
  };
  const handleProfile = () => {
    setIsAuthenticated(true);
    setUserModal(false); // Close the ProfileForm modal
  };
  const handleMyPostsClick = () => {
    history.push("/myPosts");
  };

  return (
    <>
      <header className="posterbg">
        <div className="container fix-width-header row justify-content align-items">
          <div className="logo">
            <img
              src="./images/Group_2.png"
              alt="Oops"
              className="logo-image-header"
            />
            <p className="logo-text-header">Mafqoud</p>
          </div>

          <div className="nav">
            {!isAuthenticated && (
              <ul
                className={
                  navlist ? "small" : "row justify-content align-items"
                }
              >
                {nav.map((list, index) => (
                  <li key={index}>
                    <Link to={list.path}>{list.text}</Link>
                  </li>
                ))}
              </ul>
            )}
            {isAuthenticated && (
              <ul
                className={
                  navlist ? "small" : "row justify-content align-items"
                }
              >
                {nav.map((list, index) => (
                  <li key={index}>
                    <Link to={list.path}>{list.text}</Link>
                  </li>
                ))}
                <li>
                  <Link onClick={handleMyPostsClick} to="#">
                    My Posts
                  </Link>
                </li>
              </ul>
            )}
          </div>
          <div
            className={
              navlist
                ? "smallbtn"
                : "button row justify-content align-items gap-10"
            }
          >
            {!isAuthenticated && (
              <>
                <button onClick={toggleModal} className="logbtn">
                  Log in
                </button>
                <button onClick={toggleSignModal} className="signbtn">
                  Sign up
                </button>
              </>
            )}

            {isAuthenticated && (
              <>
                <button onClick={toggleUserModal} className="userbtn">
                  <FaRegUser />
                </button>
                <button onClick={handleLogout} className="logbtn">
                  Logout
                </button>
              </>
            )}

            {modal && (
              <div className="modal">
                <div onClick={toggleModal} className="overlay"></div>
                <LoginForm handleLogin={handleLogin} />
              </div>
            )}
            {signModal && (
              <div className="modal">
                <div onClick={toggleSignModal} className="overlay"></div>
                <Signup handleSignup={handleSignup} />
              </div>
            )}

            {userModal && (
              <div className="modal">
                <div onClick={toggleUserModal} className="overlay"></div>
                <ProfileForm handleProfile={handleProfile} />
              </div>
            )}
            <label className="toggleButton">
              <input
                onClick={toggleTheme}
                type="checkbox"
                id="toggle"
                className="checkDark"
              />
              <div className="roundButton circle">
                <div className="modeicon-box ">
                  <FaSun />
                  <FaMoon />
                </div>
              </div>
            </label>
          </div>

          <div className="toggle">
            <button onClick={() => setnavlist(!navlist)}>
              {navlist ? (
                <i className="fa fa-times"></i>
              ) : (
                <i className="fa fa-bars"></i>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
