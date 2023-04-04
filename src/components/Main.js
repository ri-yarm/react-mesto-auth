import React from "react";
import avatar from "../images/profile__avatar.jpg";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CardContext } from "../contexts/CardContext";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete}) {
  // контекст пользователя и карточек(передаётся через map комопненту Card)
  const currentUser = React.useContext(CurrentUserContext)
  const card = React.useContext(CardContext)

  /** Функция получает массив контекста карточек и создаёт экземляр карты */
  const cardsElements = card.map(
    (card) => (
      <Card
        key={card._id}
        card={card}
        onCardClick={onCardClick}
        onCardLike={onCardLike}
        onCardDelete={onCardDelete}
        currentUser={currentUser._id}
      />
    )
  )

  return (
    <main className="content">
      <section className="profile">
        <a
          href="#"
          className="profile__link"
          onClick={(e) => {
            e.preventDefault()
            onEditAvatar()
          }}
        >
          <img
            className="profile__avatar"
            src={!currentUser.avatar ? avatar : currentUser.avatar}
            alt=" Ваш аватар."
          />
        </a>
        <div className="profile__info">
          <div className="profile__nickname">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button
              onClick={() => onEditProfile()}
              type="button"
              className="profile__edit-button button"
              aria-label=" Изменить профиль."
            ></button>
          </div>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button
          onClick={() => onAddPlace()}
          type="button"
          className="profile__add-button button"
          aria-label=" Добавить пост."
        ></button>
      </section>
      <section className="places">
        {cardsElements}
      </section>
    </main>
  );
}

export default Main;
