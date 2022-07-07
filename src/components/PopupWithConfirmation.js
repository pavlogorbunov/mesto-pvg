import {PopupWithForm} from './PopupWithForm.js';

class PopupWithConfirmation extends PopupWithForm {
    constructor(popupSelector, handleSubmit) {
        super(popupSelector, handleSubmit);
    }

    open (id, deleteCard) {
        this._id = id;
        this._element.addEventListener('submit', () => deleteCard(id));
        this._element.classList.add('popup_visible');
        document.addEventListener('keydown', this._handleEscClose);
    }
}

export { PopupWithConfirmation };