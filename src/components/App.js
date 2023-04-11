import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import Login from "./Login";
import Register from "./Register";

import EditProfilePopup from "./Popups/EditProfilePopup";
import EditAvatarPopup from "./Popups/EditAvatarPopup";
import AddPlacePopup from "./Popups/AddPlacePopup";
import DeleteCardPopup from "./Popups/DeleteCardPopup";
import ImagePopup from "./Popups/ImagePopup";
import InfoTooltip from "./Popups/InfoTooltip";

import ProtectedRoute from "./hoc/ProtectedRoute";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CardContext } from "../contexts/CardContext";

import * as api from "../utils/Api";

function App() {
  // стейты состояния попапов(по умолчанию не видно)
  const [isEditProfilePopupOpened, setIsEditProfilePopupOpened] =
    React.useState(false);
  const [isAddPlacePopupOpened, setAddPlacePopupOpened] = React.useState(false);
  const [isEditAvatarPopupOpened, setEditAvatarPopupOpened] =
    React.useState(false);
  const [isDeleteCardPopupOpened, setDeleteCardPopupOpened] =
    React.useState(false);

  const [isInfoTooltip, setInfoTooltip] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(false); // лоудер
  const [selectedCard, setSelectedCard] = React.useState({}); // выбранная карточка
  const [deletedCard, setDeletedCard] = React.useState({}); //стейт удаляемой карточки
  const [currentUser, setCurrentUser] = React.useState({}); // стейт юзера

  const [registredUser, setRegistredUser] = React.useState({});

  const [cards, setCards] = React.useState([]); //стейт с массивом карточек
  const location = useLocation();
  const currentPath = location.pathname;
  const [LoggedIn, setLoggedIn] = React.useState(false); //стейт авторизации

  // Есть ли хоть один открытый попап
  const isOpen =
    isEditProfilePopupOpened ||
    isAddPlacePopupOpened ||
    isEditAvatarPopupOpened ||
    isDeleteCardPopupOpened ||
    selectedCard.link;

  /** Эти функции открывают свой попап */
  const openEditProfilePopup = () => setIsEditProfilePopupOpened(true);
  const openAddPlacePopup = () => setAddPlacePopupOpened(true);
  const openEditAvatarPopup = () => setEditAvatarPopupOpened(true);
  const openDeleteCardPopup = (data) => {
    setDeleteCardPopupOpened(true); // открываем попап удаления
    setDeletedCard(data); //получаем от колбэка информацию о удаляемой карточки и сохраняем в стейт(которой суём в попап удаления)
  };

  /** Ставим всем стейтам попапов false(закрывает все попапы) */
  const closeAllPopups = () => {
    setIsEditProfilePopupOpened(false);
    setAddPlacePopupOpened(false);
    setEditAvatarPopupOpened(false);
    setSelectedCard({});
    setDeleteCardPopupOpened(false);
    // setInfoTooltip(false)
  };

  /** обращение к апи. поиск лайка среди массива лайков карточки и его последущая смена на лайк/дизлайк */
  const handleCardClick = (card) => {
    const isLiked = card.likes.some((like) => like._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((cardLikes) =>
        setCards((state) =>
          state.map(
            (
              handleLike //перебираем массив лайков конкретной карточки
            ) => (handleLike._id === card._id ? cardLikes : handleLike)
          )
        )
      )
      .catch((err) => console.log(err));
  };

  /** обращение к апи. Поиск удаляемой карточки в массиве и его удаление */
  const handleCardDelete = (card) => {
    setIsLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards(
          (state) => state.filter((deletedCard) => deletedCard._id !== card._id) //перебираем массив карточек, если не совпадает то удаляем её
        );

        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  /** обращение к апи. Обновление данных о пользователе */
  const handleUpdateUser = (data) => {
    setIsLoading(true);
    api
      .setUserInfo(data)
      .then((info) => {
        setCurrentUser(info);

        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  /** обращение к апи. Обновление данных аватара */
  const handleUpdateAvatar = (dataImage) => {
    setIsLoading(true);
    api
      .setNewAvatar(dataImage)
      .then((data) => {
        setCurrentUser(data);

        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  /** обращение к апи. Добавление новой карточки */
  const handleAddPlaceSubmit = (newCard) => {
    setIsLoading(true);
    api
      .postNewPhoto(newCard)
      .then((card) => {
        setCards([card, ...cards]);

        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };


  const handleLogin = (res) => {
    setLoggedIn(true);
    setRegistredUser(res);
  };

  // для получение данных через api
  useEffect(() => {
    const userPromise = api.getUserInfo();
    const cardPromise = api.getDefaultCard();

    // сналачала обрабатываем промис пользователя, и если всё норм промис карточек
    Promise.all([userPromise, cardPromise])
      .then((res) => {
        const [userResponse, cardResponse] = res;
        setCurrentUser(userResponse);

        setCards(cardResponse);
      })
      .catch((err) => console.log(err));
  }, []);

  // для подписки на закрытие попапа через esc
  useEffect(() => {
    function closeByEscape(evt) {
      //закрытие попапа esc
      if (evt.key === "Escape") closeAllPopups()
    }

    if (isOpen) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CardContext.Provider value={cards}>
        <div className="App">
          <div className="page__container">
            <Header currentPath={currentPath} registredUser={registredUser} setLoggedIn={setLoggedIn} />

            <Routes>
              {/* <Route
                path="/"
                element={
                  <Main
                    onEditProfile={openEditProfilePopup}
                    onAddPlace={openAddPlacePopup}
                    onEditAvatar={openEditAvatarPopup}
                    onCardClick={setSelectedCard}
                    onCardLike={handleCardClick}
                    onCardDelete={openDeleteCardPopup}
                  />
                }
              /> */}
              <Route
                path="/"
                element={
                  <ProtectedRoute
                    element={Main}
                    loggedIn={LoggedIn}
                    onEditProfile={openEditProfilePopup}
                    onAddPlace={openAddPlacePopup}
                    onEditAvatar={openEditAvatarPopup}
                    onCardClick={setSelectedCard}
                    onCardLike={handleCardClick}
                    onCardDelete={openDeleteCardPopup}
                  />
                }
              />
              <Route path="/sign-in" element={<Login handleLogin={handleLogin} />} />
              <Route
                path="/sign-up"
                element={<Register />}
              />
              <Route
                path="/"
                element={
                  LoggedIn ? (
                    <Navigate to="/" replace />
                  ) : (
                    <Navigate to="/sign-in" replace />
                  )
                }
              />
            </Routes>

            <Footer user={currentUser.name} />

            <EditProfilePopup
              isOpen={isEditProfilePopupOpened}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
              isLoading={isLoading}
            />

            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpened}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
              isLoading={isLoading}
            />

            <AddPlacePopup
              isOpen={isAddPlacePopupOpened}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit}
              isLoading={isLoading}
            />

            <ImagePopup card={selectedCard} onClose={closeAllPopups} />

            <DeleteCardPopup
              card={deletedCard}
              isOpen={isDeleteCardPopupOpened}
              onClose={closeAllPopups}
              onDeleteCard={handleCardDelete}
              isLoading={isLoading}
            />

            {/* <InfoTooltip isOpen={isInfoTooltip} onClose={closeAllPopups} /> */}
          </div>
        </div>
      </CardContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
