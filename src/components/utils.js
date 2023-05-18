// функция закрытия попапа через esc 
const closeOnEsc = (evt) => {
  if (evt.key === 'Escape') {
    closePopup();
  }
};

export { closeOnEsc };