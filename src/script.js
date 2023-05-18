import initialCards from "./components/constants.js";
import { enableValidation } from "./components/validate.js";
import { closePopup } from "./components/utils.js";
import { closePopupBtn, closePopupOverlay, openProfilePopup, openCardPopup } from "./components/modal.js";
import { popupPlaceAdd, addCardsFromArr, listenerCards, submitCardFormHandler } from "./components/card.js"

const popupProfileEdit = document.querySelector('.popup_type_profile');
const nameInput = document.querySelector('.profile__title');
const jobInput = document.querySelector('.profile__subtitle');
// инпуты попапов
const popupName = document.forms.profileForm.nameInput;
const popupJob = document.forms.profileForm.jobInput;

// изменение Имени и Профессии, плейсхолдер соответствует значениям на странице
const submitFormHandler = (evt) => {
  evt.preventDefault();

  const jobValue = popupJob.value;
  const nameValue = popupName.value;
  
  nameInput.textContent = nameValue;
  jobInput.textContent = jobValue;

  closePopup(popupProfileEdit);
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