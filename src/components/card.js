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
  const deleteButtons = Array.from(document.querySelectorAll('.card__delete'));
  const likeButtons = Array.from(document.querySelectorAll('.card__like'));
  const cardImages = Array.from(document.querySelectorAll('.card__image'));

  card.querySelector('.card__image').src = link;
  card.querySelector('.card__image').alt = place;
  card.querySelector('.card__title').textContent = place;

  deleteButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      btn.closest('.card').remove();
    });
  });

  likeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('card__like_active');
    });
  });
  
  cardImages.forEach((img) => {
    img.addEventListener('click', () => {
      const itemText = img.closest('.card').querySelector('.card__title').textContent;

      popupImagePicture.src = img.src;
      popupImagePicture.alt = itemText;
      imageCaption.textContent = itemText;
      openPopup(popupImage);
    });
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
