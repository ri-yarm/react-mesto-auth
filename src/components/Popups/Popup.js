import { useEffect } from "react";

const Popup = ({ isOpen, children, onClose }) => {
  // закрытие попапа на оверлей
  const overlayClickHandler = (evt) => {
    const exitButton = document.querySelector(".popup__exit-button"); // что бы не прокидывать каждой кнопке обработчик закрытия, сделал такой костыль
    if (evt.target === evt.currentTarget || evt.target === exitButton) {
      onClose();
    }
  };

  // для подписки на закрытие попапа через esc
  useEffect(() => {
    function closeByEscape(evt) {
      //закрытие попапа esc
      if (evt.key === "Escape") onClose();
    }

    if (isOpen) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }

    // блокирую скролл при открытом попапе
    document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = "hidden";
    };
  }, [isOpen]);

  return (
    isOpen && (
      <div className="popup popup_opened" onClick={overlayClickHandler}>
        {children}
      </div>
    )
  );
};

export default Popup;
