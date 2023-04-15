import React, { useState } from "react";
import HamburgerMenu from "./HamburgerMenu";
import logo from "../images/header__logo.svg";
import { Link } from "react-router-dom";

function Header({ currentPath, registredUser, signOut }) {
  const [isOpen, setIsOpen] = useState(false); // для гамбургера

  /** Функция меняет стейт клика на гамбургер */
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={`header ${isOpen ? "header_hamburger" : ""}`}>
      <Link to="/">
        <img className="header__logo" src={logo} alt=" Места России." />
      </Link>
      <ul className={`header__nav ${isOpen ? "header__nav_hamburger" : ""}`}>
        {currentPath === "/" && (
          <li>
            <a href="#" className="header__email">
              {registredUser?.email}
            </a>
          </li>
        )}
        {currentPath === "/" && (
          <li>
            <button className="link header__link" to="/sign-in" onClick={signOut}>
              Выйти
            </button>
          </li>
        )}
      </ul>
      {currentPath !== "/" && (
        <ul className={`header__nav_auth`}>
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
        </ul>
      )}
      {currentPath === "/" && (
        <HamburgerMenu isOpen={isOpen} handleClick={handleClick} />
      )}
    </header>
  );
}

export default Header;
