import {Popup} from './Popup.js';

class PopupWithForm extends Popup {
    constructor (popupSelector, handleSubmit) {
        super(popupSelector);
        this._handleSubmit = handleSubmit;
        this._inputList = this._element.querySelectorAll('input');
        this._submitButton = this._element.querySelector('.popup__form-save');
    }

    _getInputValues () {
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    close () {
        super.close();
        this._formElement.reset();
    }

    renderLoading(isLoading) {
        if(isLoading) {
            this._submitButton.textContent = 'Сохранение...'
        } else {
            this._submitButton.textContent = 'Сохранить'
        }
    }

    setEventListeners () {
        super.setEventListeners();
        this._formElement = this._element.querySelector('form');
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmit(this._getInputValues());    
        });
    }
}

export {PopupWithForm};