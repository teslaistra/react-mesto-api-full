import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const userInfo = React.useContext(CurrentUserContext);

  const isOwn = card.owner === userInfo._id;

  console.log(card)
  console.log(isOwn);
  console.log(card.owner, userInfo._id);
  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = `element__delete ${
    isOwn ? "" : "element__delete_hidden"
  }`;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i._id === userInfo._id);
  // console.log(card.likes, userInfo._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `element__like ${
    isLiked ? "element__like_active" : ""
  }`;

  const handleClick = () => {
    onCardClick(card);
  };

  const handleDelete = () => {
    onCardDelete(card);
  };

  const handleLike = () => {
    onCardLike(card);
  };

  return (
    <div className="element">
      <button
        aria-label="Удалить"
        type="button"
        className={cardDeleteButtonClassName}
        onClick={handleDelete}
      ></button>
      <img
        className="element__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <h2 className="element__title">{card.name}</h2>
      <div className="element__like-container">
        <button
          aria-label="Лайк"
          type="button"
          className={cardLikeButtonClassName}
          onClick={handleLike}
        ></button>
        <p className="element__like-number">{card.likes.length}</p>
      </div>
    </div>
  );
}

export default Card;
