const Login = () => {
  return (
    <div className="auth">
      <h2 className="auth__title">Вход</h2>
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
        <button
          type="submit"
          className="button form__submit-button form__submit-button_auth-button "
        >
          Войти
        </button>
      </form>
    </div>
  );
};

export default Login;
