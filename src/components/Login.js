import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useFormAndValidation } from "./hooks/useFormAndValidation";
import * as auth from "../utils/Auth";

const Login = ({ handleLogin, setInfoTooltip }) => {
  const navigate = useNavigate();
  const location = useLocation();
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

  const tokenCheck = () => {
    const jwt = localStorage.getItem("token");
    if (!jwt) {
      //если токен пустой то не делаем никакого запроса
      return;
    }
    auth
      .getMyEmail(jwt)
      .then((res) => {
        handleLogin(res.data);
        const url = location.state?.returnUrl || "/"; //если мы до этого хотели перейти на другую страницу, то после логина перейдём на неё
        navigate(url);
      })
      .catch(() => {
        setInfoTooltip({ isOpen: true, succes: false });
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    auth
      .authorize(values.password, values.email)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("token", res.token);
          const url = location.state?.returnUrl || "/"; //если мы до этого хотели перейти на другую страницу, то после логина перейдём на неё
          navigate(url);
        }
      })
      .catch(() => {
        setInfoTooltip({ isOpen: true, succes: false });
      });
  };

  useEffect(() => {
    tokenCheck();
  }, []);

  return (
    <main className="content">
      <div className="auth">
        <h2 className="auth__title">Вход</h2>
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            minLength="3"
            required
            className="form__input background-black"
            value={values.email || ""}
            onChange={(e) => handleChange(e)}
          />
          <span className="form__input-error">{errors.email}</span>
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            className="form__input background-black"
            required
            minLength="5"
            value={values.password || ""}
            onChange={(e) => handleChange(e)}
          />
          <span className="form__input-error">{errors.password}</span>
          <button
            type="submit"
            className={`button form__submit-button form__submit-button_auth-button ${
              !isValid ? "form__submit-button_invalid" : ""
            }`}
            disabled={!isValid}
          >
            Войти
          </button>
        </form>
      </div>
    </main>
  );
};

export default Login;
