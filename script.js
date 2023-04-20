const formElement = document.querySelector('.popup_type_profile');
const formCard = document.querySelector('.popup_type_place');
const nameInput = document.querySelector('.profile__title');
const jobInput = document.querySelector('.profile__subtitle');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonsClose = document.querySelectorAll('.popup__button-close');
const buttonAdd = document.querySelector('.profile__add-button');
const popupImage = document.querySelector('.popup_type_image');
const popupImagePicture = popupImage.querySelector('.popup__image');
const cardTemplate = document.querySelector('#template_card').content;
const cardsContainer = document.querySelector('.cards');
const imageCaption = popupImage.querySelector('.popup__caption');
const popupName = document.getElementsByName('change-name')[0];
const popupJob = document.getElementsByName('change-profession')[0];
const popupPlace = document.getElementsByName('change-place')[0];
const popupImageItem = document.getElementsByName('change-image')[0];
const popupInput = document.querySelectorAll('.popup__input-item');

// функция открытия попапа
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened')
}

// функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// функция создания карточки
function createCard(place, link) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  card.querySelector('.card__image').src = link;
  card.querySelector('.card__image').alt = place;
  card.querySelector('.card__title').textContent = place;
  return card;
}

// открытие попапа редактирования профиля
buttonEdit.addEventListener('click', () => {
  openPopup(formElement);
});

// открытие попапа добавления карточки
buttonAdd.addEventListener('click', () => {
  openPopup(formCard);
});

// закрытие попапов
buttonsClose.forEach((btn) => {
  const popup = btn.closest('.popup'); 
  btn.addEventListener('click', () => closePopup(popup));
})

// изменение Имени и Профессии, плейсхолдер соответствует значениям на странице
function submitFormHandler (evt) {
  evt.preventDefault();

  if(popupName.value === '' && popupJob.value === '') {
    closePopup(formElement);
  }
  else {
    const jobValue = popupJob.value;
    const nameValue = popupName.value;
    
    nameInput.textContent = nameValue;
    jobInput.textContent = jobValue;

    closePopup(formElement);

    popupName.placeholder = nameInput.textContent;
    popupJob.placeholder = jobInput.textContent;

    evt.target.reset()
  }
}

// кнопка "сохранить". сохранение изменений и закрытие попапа
formElement.addEventListener('submit', submitFormHandler);

// карточки. массив с данными для карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
  ];

// добавление карточек с данными из массива
initialCards.forEach((item) => {
  const card = createCard(item.name, item.link);
  cardsContainer.append(card);
})

// обработчик действий в карточке
cardsContainer.addEventListener('click', function(evt) {
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

// добавление карточек через форму
function submitCardFormHandler (evt) {
  evt.preventDefault();

  if (popupPlace.value === '' && popupImageItem.value === '') {
    closePopup(formCard)
  }
  else {
    const card = createCard(popupPlace.value, popupImageItem.value);
    cardsContainer.prepend(card);
    
    closePopup(formCard);
    
    evt.target.reset()
  }
}

// кнопка "создать". сохранение изменений и закрытие попапа
formCard.addEventListener('submit', submitCardFormHandler);

