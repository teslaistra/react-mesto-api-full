import React from "react";
import headerLogo from "../images/logo.svg";

function Header({ email, loggedIn, isLogin, onLogout, loginHandler }) {
  const action = loggedIn
    ? { text: "Выйти", handler: onLogout }
    : isLogin
    ? { text: "Зарегестрироваться", handler: loginHandler }
    : { text: "Войти", handler: loginHandler };

  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="логотип место" />
      <div className="header__user-items">
        <h2 className="header__email">{email}</h2>
        <button className="header__button" onClick={action.handler}>
          {action.text}
        </button>
      </div>
    </header>
  );
}

export default Header;
