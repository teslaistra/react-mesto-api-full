import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarInputRef = React.useRef();

  React.useEffect(() => {
    avatarInputRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(avatarInputRef.current.value);
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      onClose={onClose}
      title="Обновить аватар"
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          name="avatar-link"
          id="avatar-link"
          className="popup__item popup__item_content_avatar-link"
          type="url"
          placeholder="Ссылка на картинку"
          ref={avatarInputRef}
          required
        />
        <span className="popup__item-error avatar-link-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
