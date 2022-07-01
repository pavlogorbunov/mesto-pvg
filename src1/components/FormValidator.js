class FormValidator {
    constructor (validationData, formElement) {
        this._validationData = validationData;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._validationData.inputSelector));
        this._submitButton = this._formElement.querySelector(this._validationData.submitButtonSelector);
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    }
    
    _toggleButtonState() {
        if(this._hasInvalidInput()) {
            this._submitButton.setAttribute('disabled', true);
            this._submitButton.classList.add(this._validationData.inactiveButtonClass);
        } else {
            this._submitButton.removeAttribute('disabled');
            this._submitButton.classList.remove(this._validationData.inactiveButtonClass);
        }
    }

    _showInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._validationData.inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._validationData.errorClass);
    }

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._validationData.inputErrorClass);
        errorElement.classList.remove(this._validationData.errorClass);
        errorElement.textContent = '';
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _setEventListeners() {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    }

    resetValidation() {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
          this._hideInputError(inputElement)
        });
      }

    enableValidation() {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._toggleButtonState(this._inputList, this._buttonElement, this._validationData.inactiveButtonClass);
        });
        this._setEventListeners();
    }
}

export {FormValidator};