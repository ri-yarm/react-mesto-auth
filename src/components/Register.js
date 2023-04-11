import { Link, useNavigate } from "react-router-dom";
import { useFormAndValidation } from "./hooks/useFormAndValidation";
import * as auth from "../utils/Auth";

const Register = () => {
  const navigate = useNavigate();
  const {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
    setValues,
    setIsValid,
    setErrors,
  } = useFormAndValidation();

  const handleSubmit = (e) => {
    e.preventDefault();

    /* Добавлет ошибку при сабмите если пароли не верны */
    if (values.password !== values.confirmPassword) {
      setErrors({
        ...errors,
        confirmPassword: "Пароли не совпадают",
      });
      return;
    } else {
      auth
        .register(values.password, values.email)
        .then((res) => {
          navigate("/sign-in", { replace: true })
        });
    }
  };

  return (
    <main className="content">
      <div className="auth">
        <h2 className="auth__title">Регистрация</h2>
        <form action="#" className="form" onSubmit={handleSubmit} noValidate>
          <input
            type="email"
            name="email"
            placeholder="Email"
            minLength="3"
            required
            className="form__input background-black"
            onChange={(e) => handleChange(e)}
            value={values.email || ""}
          />
          <span className="form__input-error">{errors.email}</span>

          <input
            type="password"
            name="password"
            placeholder="Пароль"
            minLength="5"
            required
            className="form__input background-black"
            onChange={(e) => handleChange(e)}
            value={values.password || ""}
          />
          <span className="form__input-error">{errors.password}</span>

          <input
            type="password"
            name="confirmPassword"
            placeholder="Повторите пароль"
            minLength="5"
            required
            className="form__input background-black"
            onChange={(e) => handleChange(e)}
            value={values.confirmPassword || ""}
          />
          <span className="form__input-error">{errors.confirmPassword}</span>

          <button
            type="submit"
            className={`button form__submit-button form__submit-button_auth-button ${
              !isValid ? "form__submit-button_invalid" : ""
            }`}
            disabled={!isValid}
          >
            Зарегистрироваться
          </button>
        </form>
        <p className="auth__subtitle">
          Уже зарегистрированы?{" "}
          <Link className="link" to="/login">
            Войти
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
