import React, { useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from "../hooks/useFormAndValidation";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser, isLoading }) => {
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();
  const currentUser = useContext(CurrentUserContext); //контекст пользователя

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser(values);
  };

  useEffect(() => {
    resetForm(currentUser);
  }, [onClose]);

  return (
    isOpen && (
      <PopupWithForm
        name="profile"
        title="Редактировать профиль"
        buttonText={isLoading ? "Сохранение" : "Обновить"}
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        isButtonDisable={isValid}
      >
        <label className="form__label">
          <input
            id="name-input"
            name="name"
            type="text"
            className="form__input form__input_type_name"
            placeholder="Введите ваше имя"
            required
            minLength="2"
            maxLength="40"
            onChange={handleChange}
            value={values.name || ""}
          />
          <span className="name-input-error form__input-error">
            {errors.name}
          </span>
        </label>
        <label className="form__label">
          <input
            id="job-input"
            name="about"
            type="text"
            className="form__input form__input_type_job"
            placeholder="Введите описание"
            required
            minLength="2"
            maxLength="200"
            onChange={handleChange}
            value={values.about || ""}
          />
          <span className="job-input-error form__input-error">
            {errors.about}
          </span>
        </label>
      </PopupWithForm>
    )
  );
};

export default EditProfilePopup;
