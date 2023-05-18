import initialCards from "./constants.js";
import { openPopup } from "./modal.js";

const popupImage = document.querySelector('.popup_type_image');
const popupImagePicture = popupImage.querySelector('.popup__image');
const cardTemplate = document.querySelector('#template_card').content;
const cardsContainer = document.querySelector('.cards');
const imageCaption = popupImage.querySelector('.popup__caption');

// функция создания карточки
const createCard = (place, link) => {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  card.querySelector('.card__image').src = link;
  card.querySelector('.card__image').alt = place;
  card.querySelector('.card__title').textContent = place;
  card.addEventListener('click', (evt) => {
    const evtTarget = evt.target;
    const evtCurrentTarget = evt.currentTarget;
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
      const itemText = evtCurrentTarget.querySelector('.card__title').textContent;
      
      popupImagePicture.src = evtTarget.src;
      popupImagePicture.alt = itemText;
      imageCaption.textContent = itemText;
      openPopup(popupImage);
    }
  });

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
}




export { createCard, addCardsFromArr, listenerCards };