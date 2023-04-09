import { Link, useNavigate } from "react-router-dom";
import { useFormAndValidation } from "./hooks/useFormAndValidation";
import * as auth from "../utils/Auth";

const Register = () => {
  const navigate = useNavigate();
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();

  const handleSubmit = (e) => {
    e.preventDefault();

    auth
      .register(values.password, values.email)
      .then(() => navigate("/sign-in", { replace: true }));

    /* Object { _id: "6432d88cd4567c00131eb6c7", email: "tho@gmail.com" } */
  };
  return (
    <main className="content">
      <div className="auth">
        <h2 className="auth__title">Регистрация</h2>
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            minLength="3"
            className="form__input background-black"
            onChange={handleChange}
            value={values.email || ""}
          />
          <span className="form__input-error">{errors.email}</span>
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            minLength="5"
            className="form__input background-black"
            onChange={handleChange}
            value={values.password || ""}
          />
          <span className="form__input-error">{errors.password}</span>
          <button
            type="submit"
            className="button form__submit-button form__submit-button_auth-button"
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
