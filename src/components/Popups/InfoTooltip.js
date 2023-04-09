import React, { useContext, useEffect } from "react";

import falsyLogin from "../../images/falseAuth.svg";
import truthyLogin from "../../images/trueAuth.svg";

const InfoTooltip = ({ isOpen, onClose }) => {
  return (
    isOpen && (
      <div className={`popup popup_opened`} id="popupZoom">
        <div className="popup__info">
        <button
          onClick={onClose}
          type="button"
          className="button popup__exit-button"
          aria-label=" Закрыть попап."
        ></button>
        <img
          src={truthyLogin}
          alt={` Вы успешно зарегистрировались!`}
          className="popup__info_image"
        />
        <h2 className="popup__info_title">Вы успешно зарегистрировались!</h2>
        </div>
      </div>
    )
  );
};

export default InfoTooltip;
