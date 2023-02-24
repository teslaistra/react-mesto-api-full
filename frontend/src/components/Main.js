import React from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const userInfo = React.useContext(CurrentUserContext);

  const cardsList = cards.map((card) => (
    <Card
      card={card}
      key={card._id}
      onCardClick={onCardClick}
      onCardLike={onCardLike}
      onCardDelete={onCardDelete}
    />
  ));

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container" onClick={onEditAvatar}>
          <img
            className="profile__avatar"
            src={userInfo.avatar}
            alt="аватарка"
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{userInfo.name}</h1>
          <p className="profile__about">{userInfo.about}</p>
          <button
            aria-label="Редактировать"
            type="button"
            className="profile__edit-button"
            onClick={onEditProfile}
          ></button>
        </div>
        <button
          aria-label="Добавить"
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="elements">{cardsList}</section>
    </main>
  );
}

export default Main;
