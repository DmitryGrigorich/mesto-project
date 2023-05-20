const page = document.querySelector('.page');

// функция открытия попапа
const openPopup = (popup) =>  {
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
    const popup = elem.closest('.popup');
    elem.addEventListener('click', () => {
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
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    
    closePopup(openedPopup);
  }
};

export { closePopupBtn, closePopupOverlay, openPopup, closePopup };
