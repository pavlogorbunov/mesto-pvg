class FormValidator {
    constructor (validationData, formElem) {
        this._validationData = validationData;
        this._formElem = formElem;
    }

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    }
    
    _toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
        if(this._hasInvalidInput(inputList)) {
          buttonElement.setAttribute('disabled', true);
          buttonElement.classList.add(inactiveButtonClass);
        } else {
          buttonElement.removeAttribute('disabled');
          buttonElement.classList.remove(inactiveButtonClass);
        }
    }

    _showInputError(formElement, inputElement, errorMessage, inputErrorClass, errorClass) {
        const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(errorClass);
    }

    _hideInputError(formElement, inputElement, inputErrorClass, errorClass) {
        const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(inputErrorClass);
        errorElement.classList.remove(errorClass);
        errorElement.textContent = '';
    }

    _checkInputValidity(formElement, inputElement, inputErrorClass, errorClass) {
        if (!inputElement.validity.valid) {
            this._showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
        } else {
            this._hideInputError(formElement, inputElement, inputErrorClass, errorClass);
        }
    }

    _setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) {
        const inputList = Array.from(formElement.querySelectorAll(inputSelector));
        const buttonElement = formElement.querySelector(submitButtonSelector);
        this._toggleButtonState(inputList, buttonElement, inactiveButtonClass);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
                this._toggleButtonState(inputList, buttonElement, inactiveButtonClass);
            });
        });
    }

    enableValidation() {
        this._formElem.addEventListener('submit', (evt) => {
            evt.preventDefault();
            const inputList = Array.from(this._formElem.querySelectorAll(this._validationData.inputSelector));
            const buttonElement = this._formElem.querySelector(this._validationData.submitButtonSelector);
            this._toggleButtonState(inputList, buttonElement, this._validationData.inactiveButtonClass);
        });
        this._setEventListeners(this._formElem, this._validationData.inputSelector, this._validationData.submitButtonSelector, this._validationData.inactiveButtonClass, this._validationData.inputErrorClass, this._validationData.errorClass)    
    }
}

export {FormValidator};