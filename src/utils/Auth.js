const BASE_URL = "https://auth.nomoreparties.co";

const getResponseData = (res, about) => {
  return res.ok ? res.json() : Promise.reject(`${about}: ${res.status}`);
};

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  })
  .then((res) => getResponseData(res, ""));
};

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  })
  .then((res) => getResponseData(res, ""));
};

export const getMyEmail = (jwt) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  })
  .then((res) => getResponseData(res, ""))
};
