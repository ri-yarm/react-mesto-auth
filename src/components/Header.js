import logo from "../images/header__logo.svg";
import { Link, useNavigate } from "react-router-dom";

function Header({ currentPath, registredUser, setLoggedIn }) {
  const navigate = useNavigate();

  // console.log(registredUser.data);
  const signOut = () => {
    localStorage.removeItem("token");
    navigate("sign-in", { replace: true });
    setLoggedIn(false);
  };

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt=" Места России." />
      </Link>
      <ul className="header__nav">
        {currentPath === "/sign-up" && (
          <li>
            <Link className="link header__link" to="/sign-in">
              Войти
            </Link>
          </li>
        )}
        {currentPath === "/sign-in" && (
          <li>
            <Link className="link header__link" to="/sign-up">
              Регистрация
            </Link>
          </li>
        )}
        {currentPath === "/" && (
          <li>
            <a href="#" className="header__email">
              {registredUser?.email}
            </a>
          </li>
        )}
        {currentPath === "/" && (
          <li>
            <Link className="link header__link" to="/sign-in" onClick={signOut}>
              Выйти
            </Link>
          </li>
        )}
      </ul>
    </header>
  );
}

export default Header;
