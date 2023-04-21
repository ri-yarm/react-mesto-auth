import { useEffect} from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

const AddPlacePopup = ({ isOpen, onClose, onAddPlace, isLoading }) => {
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlace(values);
  };

  useEffect(() => {
    resetForm();
  }, [isOpen]); // при закрыти попапа всё сбрасываем

  return (
    isOpen && (
      <PopupWithForm
        name="card"
        title="Новое Место"
        buttonText={isLoading ? "Сохранение" : "Сохранить"}
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        isButtonDisable={isValid}
      >
        <label className="form__label">
          <input
            id="mesto-input"
            name="name"
            type="text"
            className="form__input form__input_type_name"
            placeholder="Название места"
            required
            minLength="2"
            maxLength="30"
            onChange={(e) => handleChange(e)}
            value={values.name || ""}
          />
          <span className="mesto-input-error form__input-error">
            {errors.name}
          </span>
        </label>
        <label className="form__label">
          <input
            id="url-input"
            name="link"
            type="url"
            className="form__input form__input_type_link"
            placeholder="Ссылка на картинку"
            required
            onChange={(e) => handleChange(e)}
            value={values.link || ""}
          />
          <span className="url-input-error form__input-error">
            {errors.link}
          </span>
        </label>
      </PopupWithForm>
    )
  );
};

export default AddPlacePopup;
