
const page = document.querySelector('.page');
// текущий открытый попап
let openedPopup = '';

// функция закрытия попапа через esc 
const closeOnEsc = (evt) => {
  if (evt.key === 'Escape') {
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
};

// функция открытия попапа
const openPopup = (popup) =>  {
  page.classList.add('page_inactive');
  popup.classList.add('popup_opened');
  openedPopup = popup;
  document.addEventListener('keydown', closeOnEsc)
};

// функция закрытия попапа
const closePopup = (popup) => {
  page.classList.remove('page_inactive')
  popup.classList.remove('popup_opened');
  openedPopup = '';
  document.removeEventListener('keydown', closeOnEsc);
};

export { openedPopup, openPopup, closePopup };