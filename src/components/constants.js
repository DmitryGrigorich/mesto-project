export const profileName = document.querySelector('.profile__title');
export const profession = document.querySelector('.profile__subtitle');
export const profileImage = document.querySelector('.profile__avatar');
export const cardsContainer = document.querySelector('.cards');
export const popupImage = document.querySelector('.popup_type_image');
export const popupImagePicture = popupImage.querySelector('.popup__image');
export const cardTemplate = document.querySelector('#template_card').content;
export const imageCaption = popupImage.querySelector('.popup__caption');
export const page = document.querySelector('.page');
export const popupProfileEdit = document.querySelector('.popup_type_profile');
export const popupAvatarEdit = document.querySelector('.popup_type_avatar');
export const avatar = document.querySelector('.profile__avatar');
export const avatarEdit = document.querySelector('.profile__avatar-edit');
export const popupPlaceAdd = document.querySelector('.popup_type_place');
export const buttonEdit = document.querySelector('.profile__edit-button');
export const formProfile = document.forms.profileForm;
export const formPlace = document.forms.placeForm;
export const formAvatar = document.forms.avatarForm;
export const popupName = formProfile.nameInput;
export const popupJob = formProfile.professionInput;
export const popupPlace = formPlace.placeInput;
export const popupImageInput = formPlace.imageInput;
export const popupAvatarInput = formAvatar.avatarInput;
export const buttonAdd = document.querySelector('.profile__add-button');
export const submitBtnStatus = {
  save: 'Сохранить',
  create: 'Создать',
  saving: 'Сохранение...'
}
console.log(formAvatar.querySelector('.popup__save-button'))
export const myId = '7425b8cd3ddcfc3541a0d6b3';
export const config = {
  mainLink: "https://nomoreparties.co/v1/plus-cohort-24",
  headers: {
    authorization: "c9aa9dd1-7486-4265-a661-016de9d2f1e8",
    'Content-Type': "application/json"
  }
}