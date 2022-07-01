import {Popup} from './Popup.js';

class PopupWithForm extends Popup {
    constructor (popupSelector, handleSubmit) {
        super(popupSelector);
        this._handleSubmit = handleSubmit;
    }

    _getInputValues () {
        this._inputList = this._element.querySelectorAll('input');
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    close () {
        super.close();
        //console.log(this._getInputValues());
        this._formElement.reset();
        //console.log(this._getInputValues());
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