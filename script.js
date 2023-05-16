const page = document.querySelector('.page');
const popups = Array.from(document.querySelectorAll('.popup'));
const popupProfileEdit = document.querySelector('.popup_type_profile');
const popupPlaceAdd = document.querySelector('.popup_type_place');
const nameInput = document.querySelector('.profile__title');
const jobInput = document.querySelector('.profile__subtitle');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonsClose = Array.from(document.querySelectorAll('.popup__button-close'));
const buttonAdd = document.querySelector('.profile__add-button');
const popupImage = document.querySelector('.popup_type_image');
const popupImagePicture = popupImage.querySelector('.popup__image');
const cardTemplate = document.querySelector('#template_card').content;
const cardsContainer = document.querySelector('.cards');
const imageCaption = popupImage.querySelector('.popup__caption');
// инпуты попапов
const popupName = document.forms.profileForm.nameInput;
const popupJob = document.forms.profileForm.jobInput;
const popupPlace = document.forms.placeForm.placeInput;
const popupImageInput = document.forms.placeForm.imageInput;
// текущий открытый попап
let openedPopup = '';

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

// функция закрытия попапа через esc 
const closeOnEsc = (evt) => {
  if (evt.key === 'Escape') {
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
};

// функция создания карточки
const createCard = (place, link) => {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  card.querySelector('.card__image').src = link;
  card.querySelector('.card__image').alt = place;
  card.querySelector('.card__title').textContent = place;
  return card;
}

// открытие попапа редактирования профиля
buttonEdit.addEventListener('click', () => {
  openPopup(popupProfileEdit);
  popupJob.value = jobInput.textContent;
  popupName.value = nameInput.textContent;
});

// открытие попапа добавления карточки
buttonAdd.addEventListener('click', () => {
  openPopup(popupPlaceAdd);
});

// закрытие попапов (Ecs, overlay)
const setListenerCloseByClick = () => {
  popups.forEach(item => {
    item.addEventListener('click', evt => {
      if (evt.target.classList.contains('popup__button-close')) {
        closePopup(item);
      }
      if (evt.target.classList.contains('popup__overlay')) {
        closePopup(item);
      }
    })
  });
};

// вызов функции закрытия по клику
setListenerCloseByClick();

/* // функция фокусировки на попапе
const focusOnForm = (form) => {
  const firstElement = form.querySelector('.popup__input');
  const lastElement = form.querySelector('.popup__save-button');

  lastElement.addEventListener('focus', () => {
    firstElement.focus();
  })
};

const enableFocus = () => {
  const forms = Array.from(document.querySelectorAll('.popup__form'));
  forms.forEach((form) => {
    focusOnForm(form);
  })
}

enableFocus(); */

// изменение Имени и Профессии, плейсхолдер соответствует значениям на странице
const submitFormHandler = (evt) => {
  evt.preventDefault();

  if(popupName.value === '' && popupJob.value === '') {
    closePopup(popupProfileEdit);
  }
  else {
    const jobValue = popupJob.value;
    const nameValue = popupName.value;
    
    nameInput.textContent = nameValue;
    jobInput.textContent = jobValue;

    closePopup(popupProfileEdit);

    evt.target.reset()
  }
};

// кнопка "сохранить". сохранение изменений и закрытие попапа
popupProfileEdit.addEventListener('submit', submitFormHandler);

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

// добавление карточек через форму
const submitCardFormHandler = (evt) => {
  evt.preventDefault();

  if (popupPlace.value === '' && popupImageInput.value === '') {
    closePopup(popupPlaceAdd)
  }
  else {
    const card = createCard(popupPlace.value, popupImageInput.value);
    cardsContainer.prepend(card);
    
    closePopup(popupPlaceAdd);
    
    evt.target.reset()
  }
};

// кнопка "создать". сохранение изменений и закрытие попапа
popupPlaceAdd.addEventListener('submit', submitCardFormHandler);

// ошибки инпутов
// функция, добавляющая класс с ошибкой
const showInpitError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
};

// функция удаляющая класс с ошибкой
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};

// функция проверки на валидность и последующее выведение ошибки
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInpitError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

// функция добавления обработчиков всем полям формы
const setEventListeners = (formElement) => {
  const formInputs = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__save-button');


  formInputs.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement)

      toggleButtonState(formInputs, buttonElement);
    });
  });
};

// применение функции setEventListeners ко всем формам
const enableValidation = () => {
  const popupForms = Array.from(document.querySelectorAll('.popup__form'));

  popupForms.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

// вызов функции enableValidation
enableValidation();

// функция проверки на валидность инпутов
const hasInvalidInput = (formInputs) => {
  return formInputs.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (formInputs, buttonElement) => {
  if (hasInvalidInput(formInputs)) {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
};