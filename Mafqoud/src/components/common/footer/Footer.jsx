import React from "react";
import "./footer.css";
import { footer } from "../../data/Data";

import { FaTwitter } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaGooglePlay } from "react-icons/fa";

function Footer() {
  const handleIconClick = (url) => {
    window.open(url, "_blank"); // Opens the URL in a new tab
  };
  const GoogleMailIconClick = () => {
    const email = "mafqoudmafqoud@gmail.com";
    const subject = "Hello";
    const body = "I'm interested in your services.";

    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <>
      <footer>
        <div className="container">
          <div className="row justify-content topfooter">
            <div className="footer-logo footer-rightside">
              <a href="/">
                <img src="./images/Horizontal_logo.png" alt="logo" />
              </a>
            </div>

            <div className="row justify-content gap-80 footer-leftside">
              {footer.map((val, index) => (
                <div className="box" key={index}>
                  <h3>{val.title}</h3>
                  <ul>
                    {val.text.map((items, index) => (
                      <li key={index}>
                        <a href={items.path}>{items.list}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="row justify-content downfooter">
            <div className="copyright">
              <p>© Mafqoud 2023 All rights reserved.</p>
            </div>
            <div className="social row gap-20 ">
              <FaTwitter
                className="icons"
                onClick={() =>
                  handleIconClick("https://twitter.com/mafqoud28494")
                }
              />
              <FaFacebookF
                className="icons"
                onClick={() =>
                  handleIconClick(
                    "https://www.facebook.com/profile.php?id=100093381713324"
                  )
                }
              />
              <FaInstagram
                className="icons"
                onClick={() =>
                  handleIconClick("https://z-p15.www.instagram.com/mafqoud004/")
                }
              />
            </div>
          </div>
          {/* <div className="upbutton">
            <i class="fa-solid fa-angles-up"></i>
          </div> */}
        </div>
      </footer>
    </>
  );
}

export default Footer;
