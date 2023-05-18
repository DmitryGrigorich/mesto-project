import './pages/index.css';

import { enableValidation } from "./components/validate.js";
import { submitFormHandler, closePopupBtn, closePopupOverlay } from "./components/modal.js";
import { addCardsFromArr, listenerCards, submitCardFormHandler } from "./components/card.js"
import { openPopup } from "./components/utils.js";

const popupProfileEdit = document.querySelector('.popup_type_profile');
const popupPlaceAdd = document.querySelector('.popup_type_place');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const nameInput = document.querySelector('.profile__title');
const jobInput = document.querySelector('.profile__subtitle');
const popupName = document.forms.profileForm.nameInput;
const popupJob = document.forms.profileForm.jobInput;

// открытие попапа редактирования профиля
const openProfilePopup = () => {
  buttonEdit.addEventListener('click', () => {
    openPopup(popupProfileEdit);
    popupJob.value = jobInput.textContent;
    popupName.value = nameInput.textContent;
  });
};

// открытие попапа добавления карточки
const openCardPopup = () => {
  buttonAdd.addEventListener('click', () => {
    openPopup(popupPlaceAdd);
  });
};

popupProfileEdit.addEventListener('submit', submitFormHandler);

popupPlaceAdd.addEventListener('submit', submitCardFormHandler);

openProfilePopup();
addCardsFromArr();
listenerCards();
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