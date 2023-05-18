// функция, добавляющая класс с ошибкой
const showInpitError = (formElement, inputElement, errorMessage, obj) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(obj.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(obj.errorClass);
};

// функция удаляющая класс с ошибкой
const hideInputError = (formElement, inputElement, obj) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(obj.inputErrorClass);
  errorElement.classList.remove(obj.errorClass);
  errorElement.textContent = '';
};

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

// функция проверки на валидность и последующее выведение ошибки
const isValid = (formElement, inputElement, obj) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInpitError(formElement, inputElement, inputElement.validationMessage, obj);
  } else {
    hideInputError(formElement, inputElement, obj);
  }
};

// функция добавления обработчиков всем полям формы
const setEventListeners = (formElement, obj) => {
  const formInputs = Array.from(formElement.querySelectorAll(obj.inputSelector));
  const buttonElement = formElement.querySelector(obj.saveButtonSelector);

  toggleButtonState(formInputs, buttonElement, obj);

  formInputs.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, obj)

      toggleButtonState(formInputs, buttonElement, obj);
    });
  });
};

// применение функции setEventListeners ко всем формам
const enableValidation = (obj) => {
  const popupForms = Array.from(document.querySelectorAll(obj.formSelector));

  popupForms.forEach((formElement) => {
    setEventListeners(formElement, obj);
  });
};

export { enableValidation };