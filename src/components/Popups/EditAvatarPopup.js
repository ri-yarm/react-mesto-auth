import { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar, isLoading }) => {
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar(values);
  };

  useEffect(() => {
    resetForm();
  }, [onClose]);

  return (
    isOpen && (
      <PopupWithForm
        name="avatar"
        title="Обновить аватар"
        buttonText={isLoading ? "Сохранение" : "Сохранить"}
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        isButtonDisable={isValid}
      >
        <label className="form__label">
          <input
            onChange={handleChange}
            value={values.avatar || ""}
            id="url-input"
            name="avatar"
            type="url"
            className="form__input form__input_type_link"
            placeholder="Ссылка на картинку"
            required
          />
          <span className="url-input-error form__input-error">
            {errors.avatar}
          </span>
        </label>
      </PopupWithForm>
    )
  );
};

export default EditAvatarPopup;
