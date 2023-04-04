import { useEffect, useState } from "react";

const ImagePopup = ({ card, onClose }) => {
  /** Всё что ниже написано, избавляет от резкого сброса пути картинки при закрытии Попапа  */
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setShowPopup(!!card.link); // конвертируем значение в логику
  }, [card]);

  const handleClose = () => {
    setShowPopup(false); // при клике на крестик меняем стейт
  };

  const handleTransitionEnd = () => {
    // если true то удаляем картинку, после завершения всех анимаций
    if (!showPopup) {
      onClose();
    }
  };

  // закрываем попап при клике на оверлей
  const overlayClickHandler = (evt) => {
    evt.stopPropagation();
    onClose()
  };

  return (
    showPopup && (
        <div
          className={`popup popup_type_zoom popup_opened`}
          id="popupZoom"
          onTransitionEnd={handleTransitionEnd}
          onClick={overlayClickHandler}
        >
          <figure className="popup__figure">
            <button
              onClick={handleClose}
              type="button"
              className="button popup__exit-button"
              aria-label=" Закрыть попап."
            ></button>
            <img
              src={card.link}
              alt={` ${card.name}.`}
              className="popup__image"
            />
            <figcaption className="popup__caption">{card.name}</figcaption>
          </figure>
        </div>
    )
  );
};

export default ImagePopup;
