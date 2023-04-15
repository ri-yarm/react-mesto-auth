import { useEffect, useState } from "react";

const ImagePopup = ({ card }) => {
  /** Всё что ниже написано, избавляет от резкого сброса пути картинки при закрытии Попапа  */
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setShowPopup(!!card.link); // конвертируем значение в логику
  }, [card]);

  return (
    showPopup && (
      <figure className="popup__figure">
        <button
          type="button"
          className="button popup__exit-button"
          aria-label=" Закрыть попап."
        ></button>
        <img src={card.link} alt={` ${card.name}.`} className="popup__image" />
        <figcaption className="popup__caption">{card.name}</figcaption>
      </figure>
    )
  );
};

export default ImagePopup;
