import React from "react";
import { Link } from "react-router-dom";

function Register({ handleRegister, setIsLogin }) {
  React.useEffect(() => {
    setIsLogin(false);
  }, []);

  const [data, setData] = React.useState({
    email: "",
    password: "",
  });

  function handleChangeEmail(e) {
    setData({ ...data, email: e.target.value });
  }

  function handleChangePassword(e) {
    setData({ ...data, password: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleRegister(data);
  }

  return (
    <form className="auth" name="login" id="login" onSubmit={handleSubmit}>
      <h2 className="auth__title">Регистрация</h2>
      <input
        className="auth__input"
        placeholder="Email"
        name="email"
        type="email"
        required
        onChange={handleChangeEmail}
        value={data.email}
      ></input>
      <input
        className="auth__input"
        placeholder="Пароль"
        name="password"
        type="password"
        required
        onChange={handleChangePassword}
        value={data.password}
      ></input>
      <button className="auth__submit-button" type="submit">
        Зарегистрироваться
      </button>

      <p className="auth__link">
        Уже зарегистрированы?{" "}
        <Link to="/sign-in" className="auth__link">
          Войти
        </Link>
      </p>
    </form>
  );
}

export default Register;
