import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState(currentUser.name);
  const [description, setDescription] = React.useState(currentUser.about);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      description,
    });
  }

  return (
    <PopupWithForm
      name="edit-profile"
      onClose={onClose}
      title="Редактировать профиль"
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          name="name"
          id="name"
          className="popup__item popup__item_content_name"
          type="text"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          value={name || ""}
          onChange={handleChangeName}
          required
        />
        <span className="popup__item-error name-error"></span>
      </label>
      <label className="popup__field">
        <input
          name="description"
          id="description"
          className="popup__item popup__item_content_description"
          type="text"
          placeholder="Деятельность"
          minLength="2"
          maxLength="200"
          value={description || ""}
          onChange={handleChangeDescription}
          required
        />
        <span className="popup__item-error description-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
