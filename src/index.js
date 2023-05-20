import './pages/index.css';

import { enableValidation } from "./components/validate.js";
import { closePopupBtn, closePopupOverlay, openPopup, closePopup } from "./components/modal.js";
import { createCard, addCardsFromArr } from "./components/card.js"

const popupProfileEdit = document.querySelector('.popup_type_profile');
const popupPlaceAdd = document.querySelector('.popup_type_place');
const buttonEdit = document.querySelector('.profile__edit-button');
const nameInput = document.querySelector('.profile__title');
const jobInput = document.querySelector('.profile__subtitle');
const popupName = document.forms.profileForm.nameInput;
const popupJob = document.forms.profileForm.jobInput;
const popupPlace = document.forms.placeForm.placeInput;
const popupImageInput = document.forms.placeForm.imageInput;
const cardsContainer = document.querySelector('.cards');
const buttonAdd = document.querySelector('.profile__add-button');

// открытие попапа редактирования профиля
const openProfilePopup = () => {
  buttonEdit.addEventListener('click', () => {
    popupProfileEdit.querySelector('.popup__save-button').disabled = true;
    openPopup(popupProfileEdit);
    popupJob.value = jobInput.textContent;
    popupName.value = nameInput.textContent;
  });
};

// добавление карточек через форму
const submitCardFormHandler = (evt) => {
  evt.preventDefault();

  const card = createCard(popupPlace.value, popupImageInput.value);
  cardsContainer.prepend(card);
    
  closePopup(popupPlaceAdd);
    
  evt.target.reset();
};

// изменение Имени и Профессии, плейсхолдер соответствует значениям на странице
const submitFormHandler = (evt) => {
  evt.preventDefault();

  const jobValue = popupJob.value;
  const nameValue = popupName.value;
  
  nameInput.textContent = nameValue;
  jobInput.textContent = jobValue;

  closePopup(popupProfileEdit);

  
};

// открытие попапа добавления карточки
const openCardPopup = () => {
  buttonAdd.addEventListener('click', () => {
    popupPlaceAdd.querySelector('.popup__save-button').disabled = true;
    openPopup(popupPlaceAdd);
  });
};


popupProfileEdit.addEventListener('submit', submitFormHandler);

popupPlaceAdd.addEventListener('submit', submitCardFormHandler);

openProfilePopup();
addCardsFromArr();
openCardPopup();
closePopupBtn();
closePopupOverlay();

enableValidation({
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
  inputSelector: '.popup__input',
  saveButtonSelector: '.popup__save-button',
  formSelector: '.popup__form'
});