import React from "react";

function ImagePopup({ isOpen, card, onClose }) {
  return (
    <div className={`popup popup_type_image ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_type_image">
        <img className="popup__image" src={card.link} alt={card.name} />
        <h2 className="popup__image-title">{card.name}</h2>
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
