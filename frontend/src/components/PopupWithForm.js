import React from "react";

function PopupWithForm({ name, title, isOpen, children, onClose, onSubmit }) {
  return (
    <div
      className={`popup popup_type_${name}  ${isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__container">
        <form name={name} className="popup__form" id={name} onSubmit={onSubmit}>
          <h2 className="popup__heading">{title}</h2>
          {children}
          <button
            id="popup__edit_submit-button"
            type="submit"
            className="popup__submit-button"
          >
            Сохранить
          </button>
        </form>
        <button
          aria-label="Закрыть"
          type="button"
          className="popup__close-button"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
