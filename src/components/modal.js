import { closeOnEsc } from "../components/utils.js";
import { enableValidation } from "../components/validate.js";

const buttonAdd = document.querySelector('.profile__add-button');
const popupPlaceAdd = document.querySelector('.popup_type_place');
const page = document.querySelector('.page');

// функция открытия попапа
const openPopup = (popup) =>  {
  enableValidation({
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active',
    inputSelector: '.popup__input',
    saveButtonSelector: '.popup__save-button',
    formSelector: '.popup__form'
  });
  page.classList.add('page_inactive');
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeOnEsc)
};

// функция закрытия попапа
const closePopup = () => {
  const openedPopup = document.querySelector('.popup_opened');
  page.classList.remove('page_inactive');
  openedPopup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeOnEsc);
};

// закрытие попапа кликом на кнопку закрытия
const closePopupBtn = () => {
  const btns = Array.from(document.querySelectorAll('.popup__button-close'));

  btns.forEach((elem) => {
    elem.addEventListener('click', () => {
      closePopup();
    });
  });
};

// закрытие попапа кликом на оверлей
const closePopupOverlay = () => {
  const overlays = Array.from(document.querySelectorAll('.popup__overlay'));

  overlays.forEach((elem) => {
    elem.addEventListener('click', () => {
      closePopup();
    });
  });
};

// открытие попапа добавления карточки
const openCardPopup = () => {
  buttonAdd.addEventListener('click', () => {
    openPopup(popupPlaceAdd);
  });
};

export { closePopupBtn, closePopupOverlay, openCardPopup, openPopup, closePopup };