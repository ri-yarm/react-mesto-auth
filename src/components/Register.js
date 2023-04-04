import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form className="form">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="form__input background-black"
        />
        <span className="form__input-error"></span>
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          className="form__input background-black"
        />
        <span className="form__input-error"></span>
        <button type="submit" className="button form__submit-button form__submit-button_auth-button">
          Зарегистрироваться
        </button>
      </form>
      <p className="auth__subtitle">
        Уже зарегистрированы? <Link className="link" to="/login">Войти</Link>
      </p>
    </div>
  );
};

export default Register;
