import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/Api.js";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

import {
  Route,
  Switch,
  Redirect,
  BrowserRouter,
  useHistory,
  withRouter,
} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/ApiAuth";
function App() {
  const history = useHistory();

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({
    name: "",
    about: "",
    avatar: "",
  });
  const [email, setEmail] = React.useState("");
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isLogin, setIsLogin] = React.useState(true);
  const [isRegisterSuccess, setIsRegisterSuccess] = React.useState(true);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .getContent(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.data.email);
            history.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const [cards, setCards] = React.useState([]);
  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userData, cardsData]) => {
          setCurrentUser(userData.data);
          setCards(cardsData.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        newCard = newCard.card;
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(data) {
    api
      .setUserInfo(data)
      .then((data) => {
        data = data.data;
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(data) {
    api
      .changeAvatar(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(data) {
    api
      .addCard(data)
      .then((data) => {
        data = data.data;
        setCards([data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoTooltipOpen(false);
  }

  function handleLogInOut() {
    isLogin ? history.push("/signup") : history.push("/signin");
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setEmail("");
    history.push("/signin");
  }

  function handleLogin(data) {
    auth
      .authorize(data)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setLoggedIn(true);
          setEmail(data.email);
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
        setIsRegisterSuccess(false);
        setIsInfoTooltipOpen(true);
      });
  }

  function handleRegister(data) {
    auth
      .register(data)
      .then((res) => {
        if (res._id) {
          localStorage.setItem("jwt", res.token);
          setLoggedIn(true);
          setEmail(res.email);
          setIsRegisterSuccess(true);
          setIsInfoTooltipOpen(true);
          history.push("/signin");
        }
      })
      .catch((err) => {
        setIsRegisterSuccess(false);
        setIsInfoTooltipOpen(true);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          loggedIn={loggedIn}
          loginHandler={handleLogInOut}
          onLogout={handleSignOut}
          isLogin={isLogin}
          email={email}
        />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            loggedIn={loggedIn}
          />
          <Route path="/signin">
            <Login handleLogin={handleLogin} setIsLogin={setIsLogin} />
          </Route>
          <Route path="/signup">
            <Register handleRegister={handleRegister} setIsLogin={setIsLogin} />
          </Route>
          <Route path="*">
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
          </Route>
        </Switch>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <InfoTooltip
          isSuccess={isRegisterSuccess}
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onPlaceAdd={handleAddPlaceSubmit}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          isOpen={isImagePopupOpen}
        />
        
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
