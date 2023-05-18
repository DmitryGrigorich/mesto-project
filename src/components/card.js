import initialCards from "./constants.js";
import { openPopup, closePopup } from "./utils.js";

const popupPlaceAdd = document.querySelector('.popup_type_place');
const popupImage = document.querySelector('.popup_type_image');
const popupImagePicture = popupImage.querySelector('.popup__image');
const cardTemplate = document.querySelector('#template_card').content;
const cardsContainer = document.querySelector('.cards');
const imageCaption = popupImage.querySelector('.popup__caption');
const popupPlace = document.forms.placeForm.placeInput;
const popupImageInput = document.forms.placeForm.imageInput;

// функция создания карточки
const createCard = (place, link) => {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  card.querySelector('.card__image').src = link;
  card.querySelector('.card__image').alt = place;
  card.querySelector('.card__title').textContent = place;
  return card;
}

// добавление карточек с данными из массива
const addCardsFromArr = () => {
  initialCards.forEach((item) => {
    const card = createCard(item.name, item.link);
    cardsContainer.append(card);
  })
}


// обработчик действий в карточке
const listenerCards = () => {
  cardsContainer.addEventListener('click', (evt) => {
    const evtTarget = evt.target;
  
    // кнопка лайка
    if (evtTarget.classList.contains('card__like')) {
      evtTarget.classList.toggle('card__like_active');
    }
    // кнопка удаления
    if (evtTarget.classList.contains('card__delete')) {
      evtTarget.closest('.card').remove();
    }
    // открытие попапа с картинкой при нажатии на картинку
    if (evtTarget.classList.contains('card__image')) {
      const itemText = evtTarget.parentNode.querySelector('.card__title').textContent;
      
      popupImagePicture.src = evtTarget.src;
      popupImagePicture.alt = itemText;
      imageCaption.textContent = itemText;
      openPopup(popupImage);
    }
  });
}


// добавление карточек через форму
const submitCardFormHandler = (evt) => {
  evt.preventDefault();

  const card = createCard(popupPlace.value, popupImageInput.value);
  cardsContainer.prepend(card);
    
  closePopup(popupPlaceAdd);
    
  evt.target.reset();
};

export { popupPlaceAdd, addCardsFromArr, listenerCards, submitCardFormHandler };