import React from "react";

function ImageModal({ image, closeModal }) {
  return (
    <div className="image-modal">
      <div className="overlay" onClick={closeModal}></div>
      <img src={image} alt="enlarged-img" className="enlarged-image" />
    </div>
  );
}

export default ImageModal;
