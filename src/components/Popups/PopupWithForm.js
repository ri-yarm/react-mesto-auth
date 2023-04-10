const PopupWithForm = ({
  name,
  title,
  buttonText,
  isOpen,
  onClose,
  onSubmit,
  children,
  isButtonDisable,
}) => {

  const overlayClickHandler = (evt) => { // закрытие попапа на оверлей
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  }

  return (
    <div className={`popup popup_type_${name} popup_opened`} onClick={overlayClickHandler}>
      <div className="popup__container">
        <button
          onClick={onClose}
          type="button"
          className="button popup__exit-button"
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form
          action="#"
          className="form"
          name={name}
          onSubmit={onSubmit}
          noValidate
        >
          {children}

          <button
            disabled={!isButtonDisable}
            type="submit"
            className={`button form__submit-button ${
              !isButtonDisable ? "form__submit-button_invalid" : ""
            }`}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;
