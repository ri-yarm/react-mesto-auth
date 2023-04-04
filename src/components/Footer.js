function Footer({user}) {
  return (
    <footer className="footer">
      <p className="footer__text">&copy;&nbsp;{new Date().getFullYear()} {user}</p>
    </footer>
  )
}

export default Footer