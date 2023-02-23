import imageSuccess from "../images/success.svg";
import imageError from "../images/error.svg";
import React from "react";

function InfoTooltip({ isSuccess, isOpen, onClose }) {
  const signUpResult = isSuccess
    ? "Вы успешно зарегистрировались!"
    : "Что-то пошло не так! Попробуйте ещё раз.";
  const pictureResult = isSuccess ? imageSuccess : imageError;
  return (
    <div
      className={`popup popup_type_info-tooltip ${isOpen && "popup_opened"}`}
    >
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
        />
        <div
          className="popup__infotooltip-image"
          style={{
            backgroundImage: `url(${pictureResult})`,
          }}
        ></div>
        <p className="popup__infotooltip-text">{signUpResult}</p>
      </div>
    </div>
  );
}

export default InfoTooltip;
