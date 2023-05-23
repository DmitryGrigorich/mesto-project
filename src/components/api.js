import { config } from "../components/constants.js";

const result = (res) => {
  return res.ok ? res.json() : Promise.reject(console.error(res.status));
}

const getInfoUser = () => {
  return fetch(`${config.mainLink}/users/me`, {
    headers: config.headers
  })
  .then(res => result(res))
}

const getCards = () => {
  return fetch(`${config.mainLink}/cards`, {
    headers: config.headers
  })
  .then(res => result(res))
}

getCards()

const postCard = (place, url) => {
  return fetch(`${config.mainLink}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: place,
      link: url
    })
  })
  .then(res => result(res))
}

const editProfileApi = (nameValue, jobValue) => {
  return fetch(`${config.mainLink}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: nameValue,
      about: jobValue
    })
  })
  .then(res => result(res))
}

const deleteCard = (cardId) => {
  return fetch(`${config.mainLink}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => result(res))
}

const like = (cardId) => {
  return fetch(`${config.mainLink}/cards/likes/${cardId}/`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(res => result(res))
}

const deleteLike = (cardId) => {
  return fetch(`${config.mainLink}/cards/likes/${cardId}/`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => result(res))
}

const patchAvatar = (url) => {
  return fetch(`${config.mainLink}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: url
    })
  })
  .then(res => result(res))
}



export {
  getInfoUser,
  getCards,
  editProfileApi,
  postCard,
  deleteCard,
  like,
  deleteLike,
  patchAvatar
};