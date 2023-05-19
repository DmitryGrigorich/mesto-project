const page = document.querySelector('.page');

// функция открытия попапа
const openPopup = (popup) =>  {
  if (popup.querySelector('.popup__save-button')) {
    popup.querySelector('.popup__save-button').disabled = true;
  }
  page.classList.add('page_inactive');
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeOnEsc)
};

// функция закрытия попапа
const closePopup = (popup) => {
  page.classList.remove('page_inactive');
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeOnEsc);
};

// закрытие попапа кликом на кнопку закрытия
const closePopupBtn = () => {
  const btns = Array.from(document.querySelectorAll('.popup__button-close'));

  btns.forEach((elem) => {
    elem.addEventListener('click', () => {
      const popup = elem.closest('.popup');
      closePopup(popup);
    });
  });
};

// закрытие попапа кликом на оверлей
const closePopupOverlay = () => {
  const overlays = Array.from(document.querySelectorAll('.popup__overlay'));

  overlays.forEach((elem) => {
    elem.addEventListener('click', () => {
      const popup = elem.closest('.popup');
      closePopup(popup);
    });
  });
};

const closeOnEsc = (evt) => {
  const openedPopup = document.querySelector('.popup_opened');
  
  if (evt.key === 'Escape') {
    closePopup(openedPopup);
  }
};

export { closePopupBtn, closePopupOverlay, openPopup, closePopup };
