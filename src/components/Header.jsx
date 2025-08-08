import { NavLink } from "react-router-dom";
import "./header.scss";
const Header = () => {
  // lógica de Javascript
  const linkIsActive = (isActive) =>
    isActive
      ? //if
        "header__item-link header__item-link--is-active text-white hover:text-gray-400 transition-colors"
      : //else
        "header__item-link text-white hover:text-gray-400 transition-colors"; //aquí combianmos las clases

  return (
    <>
      {/*  bloque */}
      <nav className="header bg-gray-800 p-4 shadow-md">
        {/*  bloque__elemento */}
        <NavLink className="header__logo text-white text-2xl font-bold" to="/">
          Alterpay
        </NavLink>
        <ul className="header__nav-list flex space-x-8">
          <li className="header__list-item">
            <NavLink
              className={({ isActive }) => linkIsActive(isActive)}
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li className="header__list-item">
            <NavLink
              className={({ isActive }) => linkIsActive(isActive)}
              to="/dashboard"
            >
              Dashboard
            </NavLink>
          </li>
          <li className="header__list-item">
            <NavLink
              className={({ isActive }) => linkIsActive(isActive)}
              to="/secret"
            >
              Secret
            </NavLink>
          </li>
          <li className="header__list-item">
            <NavLink
              className={({ isActive }) => linkIsActive(isActive)}
              to="/login"
            >
              Login
            </NavLink>
          </li>
          <li className="header__list-item">
            <NavLink
              className={({ isActive }) => linkIsActive(isActive)}
              to="/signup"
            >
              Signup
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
