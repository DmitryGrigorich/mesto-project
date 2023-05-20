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

  const deleteButtons = card.querySelector('.card__delete');
  const likeButtons = card.querySelector('.card__like');
  const cardImages = card.querySelector('.card__image');

  deleteButtons.addEventListener('click', () => deleteButtons.closest('.card').remove());

  likeButtons.addEventListener('click', () => likeButtons.classList.toggle('card__like_active'));
  
  cardImages.addEventListener('click', () => {
    const itemText = cardImages.closest('.card').querySelector('.card__title').textContent;

    popupImagePicture.src = link;
    popupImagePicture.alt = place;
    imageCaption.textContent = place;
    openPopup(popupImage);
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

export { createCard, addCardsFromArr };
