import PopupWithForm from "./PopupWithForm";

const DeleteCardPopup = ({
  card,
  isOpen,
  onClose,
  onDeleteCard,
  isLoading,
}) => {
  return (
    isOpen && (
      <PopupWithForm
        name="deleteCard"
        title="Удалить карточку?"
        buttonText={isLoading ? "Удаление" : "Удалить"}
        isOpen={isOpen}
        onClose={onClose}
        isButtonDisable={!!card} //передаём логическое значение, чтобы кнопка была кликабельной
        onSubmit={(e) => {
          e.preventDefault();
          onDeleteCard(card);
        }}
      />
    )
  );
};

export default DeleteCardPopup;
