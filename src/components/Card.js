import React from "react";

const Card = ({ card, onCardClick, currentUser, onCardLike, onCardDelete }) => {
  const isOwn = card.owner._id === currentUser;
  const isLiked = card.likes.some(like => like._id === currentUser)

  /** функция перебравсывает пропсы в компонент imagePopup */
  const handleCardClick = () => {
    onCardClick(card);
  }

  /** функция перебравсывает пропсы в компонент App, callback лайка */
  const handleLikeClick = () => {
    onCardLike(card)
  }

  /** функция перебравсывает пропсы в компонент App, callback удаления карточки */
  const handleDeleteClick = () => {
    onCardDelete(card)
  }

  return (
    <article className="card">
      {isOwn && (
        <button
          className="card__delete-btn button"
          aria-label=" Удалить карточку."
          onClick={handleDeleteClick}
        ></button>
      )}
      <img
        onClick={handleCardClick}
        className="card__image"
        src={card.link}
        alt={` ${card.name}.`}
      />
      <div className="card__ctrl-wrapper">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__likes-wrapper">
          <button
            type="button"
            className={`card__like-btn button ${isLiked && `card__like-btn_active`}`}
            aria-label=" Поставить лайк."
            onClick={handleLikeClick}
          ></button>
          <span className="card__count-likes">{card.likes.length}</span>
        </div>
      </div>
    </article>
  );
};

export default Card;
