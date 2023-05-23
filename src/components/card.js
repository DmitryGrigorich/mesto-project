import { openPopup } from "./modal.js";
import {
  popupImage,
  popupImagePicture,
  cardTemplate,
  imageCaption,
  myId
} from "./constants";
import {
  deleteCard
} from "./api.js";

// функция создания карточки
const createCard = (place, link, cardId, likes, ownerId) => {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = card.querySelector('.card__delete');
  const likeButton = card.querySelector('.card__like');
  const cardImage = card.querySelector('.card__image');

  card.setAttribute('data-id', `${cardId}`);
  card.querySelector('.card__image').src = link;
  card.querySelector('.card__image').alt = place;
  card.querySelector('.card__title').textContent = place;
  if(ownerId !== myId) {
    deleteButton.remove()
  };
  if(checkLikesData(likes)) toggleLikeStatus(likeButton);

  likesCounter(card, likes);

  deleteButton.addEventListener('click', () => {
    deleteCard(cardId);
    deleteButton.closest('.card').remove();
  })
  
  cardImage.addEventListener('click', () => {
    const itemText = cardImage.closest('.card').querySelector('.card__title').textContent;

    popupImagePicture.src = link;
    popupImagePicture.alt = place;
    imageCaption.textContent = place;
    openPopup(popupImage);
  });

  return card;
}
const checkLikesData = (likes) => {
  return likes.some((like) => {
    return like._id === myId;
  });
}

const toggleLikeStatus = (buttonElement) => {
  buttonElement.classList.toggle('card__like_active');
}

const likesCounter = (cardElement, likes) => {
  cardElement.querySelector('.card__like-counter').textContent = likes.length;
}


export { createCard, likesCounter };