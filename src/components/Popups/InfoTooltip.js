import React from "react";

import falsyLoginImage from "../../images/falseAuth.svg";
import truthyLoginImage from "../../images/trueAuth.svg";

const InfoTooltip = ({ state, onClose }) => {
  return (
    state.isOpen && (
      <div className={`popup popup_opened`} id="popupZoom">
        <div className="popup__info">
          <button
            onClick={onClose}
            type="button"
            className="button popup__exit-button"
            aria-label=" Закрыть попап."
          ></button>
          <img
            src={state.succes ? truthyLoginImage : falsyLoginImage}
            alt={` Вы успешно зарегистрировались!`}
            className="popup__info_image"
          />
          <h2 className="popup__info_title">
            {state.succes
              ? "Вы успешно зарегистрировались!"
              : "Что-то пошло не так! Попробуйте ещё раз."}
          </h2>
        </div>
      </div>
    )
  );
};

export default InfoTooltip;
