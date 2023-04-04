import * as consts from "./constants";

class Api {
  constructor(config) {
    this._url = config.api;
    this._key = config.headers;
  }

  _getResponseData = (res, about) => {
    return res.ok ? res.json() : Promise.reject(`${about}: ${res.status}`);
  };

  getUserInfo = () => {
    return fetch(`${this._url}/users/me`, {
      headers: this._key,
    }).then((res) =>
      this._getResponseData(res, "Данные о пользователе не загрузились")
    );
  };

  setUserInfo = (data) => {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._key,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) =>
      this._getResponseData(res, "Данные о пользователе не отправились!")
    );
  };

  setNewAvatar = (data) => {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._key,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => this._getResponseData(res, "Новый аватар не сохранён!"));
  };

  getDefaultCard = () => {
    return fetch(`${this._url}/cards`, {
      headers: this._key,
    }).then((res) => this._getResponseData(res, "Не удалось обновить ленту!"));
  };

  postNewPhoto = (data) => {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._key,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => this._getResponseData(res, "Новый пост не загрузился!"));
  };

  deleteCard = (card) => {
    return fetch(`${this._url}/cards/${card}`, {
      method: "DELETE",
      headers: this._key,
    }).then((res) => this._getResponseData(res, "Не удалось удалить карту!"));
  };

  changeLikeCardStatus = (cardId, isLiked) => {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: `${isLiked ? 'PUT' : 'DELETE'}`,
      headers: this._key,
    }).then((res) => this._getResponseData(res, "Не удалось удалить лайк!"));
  }
}

const api = new Api(consts.fetchConfig);

export default api;
