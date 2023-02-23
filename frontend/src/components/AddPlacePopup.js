import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onPlaceAdd }) {
  const [card, setCard] = React.useState({ name: "", link: "" });

  React.useEffect(() => {
    setCard({ name: "", link: "" });
  }, [isOpen]);

  function handleChangeInput(e) {
    setCard({ ...card, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onPlaceAdd(card);
  }

  return (
    <PopupWithForm
      name="add-element"
      onClose={onClose}
      title="Новое место"
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          name="name"
          id="name"
          className="popup__item popup__item_content_mesto-name"
          type="text"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          value={card.name}
          onChange={handleChangeInput}
          required
        />
        <span className="popup__item-error mesto-name-error"></span>
      </label>
      <label className="popup__field">
        <input
          name="link"
          id="link"
          className="popup__item popup__item_content_mesto-link"
          type="url"
          placeholder="Ссылка на картинку"
          value={card.link}
          onChange={handleChangeInput}
          required
        />
        <span className="popup__item-error link-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
