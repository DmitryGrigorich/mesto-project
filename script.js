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

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened')
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
  btn.addEventListener('click', function(evt) {
    const eventTarget = evt.target;
    eventTarget.parentNode.parentNode.classList.remove('popup_opened');
  });
})


// изменение Имени и Профессии, плейсхолдер соответствует значениям на странице
popupName.placeholder = nameInput.textContent;
popupJob.placeholder = jobInput.textContent;

function formSubmitHandler (evt) {
  evt.preventDefault();

  const jobValue = popupJob.value;
  const nameValue = popupName.value;

  nameInput.textContent = nameValue;
  jobInput.textContent = jobValue;
}

// кнопка "сохранить". сохранение изменений и закрытие попапа
formElement.addEventListener('submit', formSubmitHandler);
formElement.addEventListener('submit', () => {
  formElement.classList.remove('popup_opened');
});

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



// цикл для добавления карточек с данными из массива
initialCards.forEach((item) => {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  card.querySelector('.card__image').src = item.link;
  card.querySelector('.card__title').textContent = item.name;
  cardsContainer.append(card)
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
    popupImagePicture.src = evtTarget.src;
    imageCaption.textContent = evtTarget.parentNode.querySelector('.card__title').textContent;
    openPopup(popupImage);
  }
});

// добавление карточек через форму
function formSubmitCard (evt) {
  evt.preventDefault();

  const card = cardTemplate.querySelector('.card').cloneNode(true);
  card.querySelector('.card__image').src = popupImageItem.value;
  card.querySelector('.card__title').textContent = popupPlace.value;
  cardsContainer.prepend(card)
}

// кнопка "создать". сохранение изменений и закрытие попапа
formCard.addEventListener('submit', formSubmitCard);
formCard.addEventListener('submit', () => {
  formCard.classList.remove('popup_opened');
});


