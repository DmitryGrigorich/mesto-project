import { openedPopup, openPopup, closePopup } from "../components/utils.js";

const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const popupProfileEdit = document.querySelector('.popup_type_profile');
const popupPlaceAdd = document.querySelector('.popup_type_place');
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

export { closePopupBtn, closePopupOverlay, openProfilePopup, openCardPopup }