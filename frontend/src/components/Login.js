import React from "react";

function Login({ handleLogin, setIsLogin }) {
  React.useEffect(() => {
    setIsLogin(true);
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
    handleLogin(data);
  }

  return (
    <form className="auth" name="login" id="login" onSubmit={handleSubmit}>
      <h2 className="auth__title">Вход</h2>
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
        Войти
      </button>
    </form>
  );
}

export default Login;
