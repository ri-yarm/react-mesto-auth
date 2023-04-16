import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="notFound">
      <h1 className="notFound__title">404</h1>
      <h2 className="notFound__subtitle">Такой страницы не существует! Перейти на <Link className="link notFound__link" to='/' replace>главную</Link> ?</h2>
    </main>
  );
}

export default NotFound;
