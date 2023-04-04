import logo from '../images/header__logo.svg';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt=" Места России." />
      </Link>
      <Link className='link' to='/sign-in' >Войти</Link>
      <Link className='link' to='/sign-up' >Регистрация</Link>

    </header>
  )
}

export default Header;