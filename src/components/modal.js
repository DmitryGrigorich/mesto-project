import { openedPopup, closePopup } from "../components/utils.js";


const popupProfileEdit = document.querySelector('.popup_type_profile');
const nameInput = document.querySelector('.profile__title');
const jobInput = document.querySelector('.profile__subtitle');
// инпуты попапов
const popupName = document.forms.profileForm.nameInput;
const popupJob = document.forms.profileForm.jobInput;

// закрытие попапа кликом на кнопку закрытия
const closePopupBtn = () => {
  const btns = Array.from(document.querySelectorAll('.popup__button-close'));

  btns.forEach((elem) => {
    elem.addEventListener('click', () => {
      closePopup(openedPopup);
    });
  });
};

// закрытие попапа кликом на оверлей
const closePopupOverlay = () => {
  const overlays = Array.from(document.querySelectorAll('.popup__overlay'));

  overlays.forEach((elem) => {
    elem.addEventListener('click', () => {
      closePopup(openedPopup);
    });
  });
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

export { submitFormHandler, closePopupBtn, closePopupOverlay }