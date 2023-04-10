import * as consts from "./constants";

const fetchConfig = {
  api: "https://mesto.nomoreparties.co/v1/cohort-60",
  headers: {
    authorization: "1f745ad3-aa67-41eb-8e30-0cec0319d4b2",
    "Content-Type": "application/json",
  },
};

const getResponseData = (res, about) => {
  return res.ok ? res.json() : Promise.reject(`${about}: ${res.status}`);
};

export const getUserInfo = () => {
  return fetch(`${fetchConfig.api}/users/me`, {
    headers: fetchConfig.headers,
  }).then((res) =>
    getResponseData(res, "Данные о пользователе не загрузились")
  );
};

export const setUserInfo = (data) => {
  return fetch(`${fetchConfig.api}/users/me`, {
    method: "PATCH",
    headers: fetchConfig.headers,
    body: JSON.stringify({
      name: data.name,
      about: data.about,
    }),
  }).then((res) =>
    getResponseData(res, "Данные о пользователе не отправились!")
  );
};

export const setNewAvatar = (data) => {
  return fetch(`${fetchConfig.api}/users/me/avatar`, {
    method: "PATCH",
    headers: fetchConfig.headers,
    body: JSON.stringify({
      avatar: data.avatar,
    }),
  }).then((res) => getResponseData(res, "Новый аватар не сохранён!"));
};

export const getDefaultCard = () => {
  return fetch(`${fetchConfig.api}/cards`, {
    headers: fetchConfig.headers,
  }).then((res) => getResponseData(res, "Не удалось обновить ленту!"));
};

export const postNewPhoto = (data) => {
  return fetch(`${fetchConfig.api}/cards`, {
    method: "POST",
    headers: fetchConfig.headers,
    body: JSON.stringify({
      name: data.name,
      link: data.link,
    }),
  }).then((res) => getResponseData(res, "Новый пост не загрузился!"));
};

export const deleteCard = (card) => {
  return fetch(`${fetchConfig.api}/cards/${card}`, {
    method: "DELETE",
    headers: fetchConfig.headers,
  }).then((res) => getResponseData(res, "Не удалось удалить карту!"));
};

export const changeLikeCardStatus = (cardId, isLiked) => {
  return fetch(`${fetchConfig.api}/cards/${cardId}/likes`, {
    method: `${isLiked ? "PUT" : "DELETE"}`,
    headers: fetchConfig.headers,
  }).then((res) => getResponseData(res, "Не удалось удалить лайк!"));
};
