import logo from '../images/header__logo.svg';
import { Link } from 'react-router-dom';

function Header({currentPath}) {
  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt=" Места России." />
      </Link>
      {currentPath === '/sign-up' && <Link className='link header__link' to='/sign-in' >Войти</Link>}
      {currentPath === '/sign-in' && <Link className='link header__link' to='/sign-up' >Регистрация</Link>}
      {currentPath === '/' && <a href='#' className='header__email'>email@mail.com</a>}
    </header>
  )
}

export default Header;