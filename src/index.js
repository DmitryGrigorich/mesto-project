import './pages/index.css';

import { enableValidation } from "./components/validate.js";
import {
  closePopupBtn,
  closePopupOverlay,
  openPopup,
  closePopup
} from "./components/modal.js";

import {
  createCard,
  likesCounter
} from "./components/card.js";

import { 
  getInfoUser,
  getCards,
  editProfileApi,
  postCard,
  like,
  deleteLike,
  patchAvatar
} from "./components/api.js"

import {
  renderProfile,
  renderAvatar
} from "./components/profile.js"

import {
  popupProfileEdit,
  popupPlaceAdd,
  buttonEdit,
  buttonAdd,
  profileName,
  profession,
  popupName,
  popupJob,
  popupPlace,
  popupImageInput,
  cardsContainer,
  avatarEdit,
  popupAvatarEdit,
  popupAvatarInput,
  avatar,
  formProfile,
  formPlace,
  formAvatar,
  submitBtnStatus
} from "./components/constants.js"


const addCard = (card) => {
  cardsContainer.prepend(card)
}

// получение данных с сервера
Promise.all([getCards(), getInfoUser()])
  .then(([cardsData, userData]) => {
    renderProfile(userData.name, userData.about)
    renderAvatar(userData.avatar)
    cardsData.forEach(cardData => {
      const card = createCard(cardData.name, cardData.link, cardData._id, cardData.likes, cardData.owner._id)
      card.querySelector('img').onload = cardsContainer.append(card);
    })
  })
  .catch(err => console.error(`Ошибка: ${err}`))

// открытие попапа редактирования профиля
const openProfilePopup = () => {
  buttonEdit.addEventListener('click', () => {
    popupProfileEdit.querySelector('.popup__save-button').disabled = true;
    openPopup(popupProfileEdit);
    popupJob.value = profession.textContent;
    popupName.value = profileName.textContent;
  });
};

// открытие попапа добавления карточки
const openCardPopup = () => {
  buttonAdd.addEventListener('click', () => {
    popupPlaceAdd.querySelector('.popup__save-button').disabled = true;
    openPopup(popupPlaceAdd);
  });
};

// открытие попапа редактирования аватара
const openAvatarPopup = () => {
  avatarEdit.addEventListener('click', () => {
    popupAvatarEdit.querySelector('.popup__save-button').disabled = true;
    openPopup(popupAvatarEdit);
  })
};

// редактирование аваатар
const profileAvatarEdit = (evt) => {
  evt.preventDefault();
  formAvatar.querySelector('.popup__save-button').textContent = submitBtnStatus.saving;

  patchAvatar(popupAvatarInput.value)
    .then(res => {
      avatar.src = res.avatar;
      closePopup(popupAvatarEdit)
    })
    .catch(err => console.error(`Ошибка: ${err}`))
    .finally(() => {
      formAvatar.querySelector('.popup__save-button').textContent = submitBtnStatus.save;
    });
    evt.target.reset(); 
};

popupAvatarEdit.addEventListener('submit', profileAvatarEdit);

// добавление карточек через форму
const submitCardFormHandler = (evt) => {
  evt.preventDefault();

  formPlace.querySelector('.popup__save-button').textContent = submitBtnStatus.saving;
  postCard(popupPlace.value, popupImageInput.value)
    .then((cardData) => {
      addCard(createCard(cardData.name, cardData.link, cardData._id, cardData.likes, cardData.owner._id))
      closePopup(popupPlaceAdd)
    })
    .catch(err => console.error(`Ошибка: ${err}`))
    .finally(() => {
      formPlace.querySelector('.popup__save-button').textContent = submitBtnStatus.create;
    });
  evt.target.reset();  
};

popupPlaceAdd.addEventListener('submit', submitCardFormHandler);

// изменение Имени и Профессии, плейсхолдер соответствует значениям на странице
const submitFormHandler = (evt) => {
  evt.preventDefault();
  formProfile.querySelector('.popup__save-button').textContent = submitBtnStatus.saving;
  editProfileApi(popupName.value, popupJob.value)
    .then(profileData => {
      renderProfile(profileData.name, profileData.about);
      closePopup(popupProfileEdit);
    })
    .catch(err => console.error(`Ошибка: ${err}`))
    .finally(() => {
      formProfile.querySelector('.popup__save-button').textContent = submitBtnStatus.saving;
    })
};

popupProfileEdit.addEventListener('submit', submitFormHandler);

const handlerLikes = (evt) => {
  if(evt.target.classList.contains('card__like')) {
    const card = evt.target.closest('.card')
    if(!evt.target.classList.contains('card__like_active')) {
      like(card.dataset.id)
        .then((cardData) => {
          evt.target.classList.toggle('card__like_active');
          likesCounter(card, cardData.likes)
        })
        .catch(err => console.log(err))
    } else if(evt.target.classList.contains('card__like_active')) {
      deleteLike(card.dataset.id)
        .then((cardData) => {
          evt.target.classList.toggle('card__like_active');
          likesCounter(card, cardData.likes)
        })
        .catch(err => console.log(err))
    }
  }
}

cardsContainer.addEventListener('click', handlerLikes)

openProfilePopup();
openCardPopup();
closePopupBtn();
closePopupOverlay();
openAvatarPopup();

enableValidation({
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
  inputSelector: '.popup__input',
  saveButtonSelector: '.popup__save-button',
  formSelector: '.popup__form'
});
