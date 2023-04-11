import logo from '../images/header__logo.svg';
import { Link, useNavigate } from 'react-router-dom';

function Header({currentPath, registredUser, setLoggedIn}) {
  const navigate = useNavigate();

  // console.log(registredUser.data);
  const signOut = () => {
    localStorage.removeItem('token')
    navigate('sign-in' ,{ replace : true})
    setLoggedIn(false)
  }

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt=" Места России." />
      </Link>
      <ul className="header__nav">
      {currentPath === '/sign-up' && <Link className='link header__link' to='/sign-in' >Войти</Link>}
      {currentPath === '/sign-in' && <Link className='link header__link' to='/sign-up' >Регистрация</Link>}
      {currentPath === '/' && <a href='#' className='header__email'>{registredUser?.data?.email}</a>}
      {currentPath === '/' && <Link className='link header__link' to='/sign-in' onClick={signOut} >Выйти</Link>}
      </ul>
    </header>
  )
}

export default Header;