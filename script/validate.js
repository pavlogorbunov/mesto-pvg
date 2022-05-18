const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__form-input',
    submitButtonSelector: '.popup__form-save',
    inactiveButtonClass: 'popup__form-save_disabled',
    inputErrorClass: 'popup__form-input_type_error',
    errorClass: 'popup__form-error_visible'
};
  
const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
};
  
const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
};
  
const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
    } else {
      hideInputError(formElement, inputElement, inputErrorClass, errorClass);
    }
};
  
const setEventListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, inputErrorClass , errorClass);
        toggleButtonState(inputList, buttonElement, inactiveButtonClass);
      });
    });
  };
  
  const enableValidation = (settings) => {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
    formList.forEach(formElement => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
            const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
            const buttonElement = formElement.querySelector(settings.submitButtonSelector);
            toggleButtonState(inputList, buttonElement, settings.inactiveButtonClass);
        });
        setEventListeners(formElement, settings.inputSelector, settings.submitButtonSelector, settings.inactiveButtonClass, settings.inputErrorClass, settings.errorClass)
    });
  };
  
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }
  
  const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    if(hasInvalidInput(inputList)) {
      buttonElement.setAttribute('disabled', true);
      buttonElement.classList.add(inactiveButtonClass);
    } else {
      buttonElement.removeAttribute('disabled');
      buttonElement.classList.remove(inactiveButtonClass);
    }
  }
  
  enableValidation(validationSettings);