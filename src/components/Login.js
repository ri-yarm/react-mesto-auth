import { useFormAndValidation } from "./hooks/useFormAndValidation";

const Login = () => {
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();

    const handleSubmit = (e) => {
      e.preventDefault();
    }

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
            className="form__input background-black"
            value={values.email || ''}
            onChange={handleChange}
          />
          <span className="form__input-error">{errors.email}</span>
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            className="form__input background-black"
            minLength="5"
            value={values.password || ''}
            onChange={handleChange}
          />
          <span className="form__input-error">{errors.password}</span>
          <button
            type="submit"
            className="button form__submit-button form__submit-button_auth-button "
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
