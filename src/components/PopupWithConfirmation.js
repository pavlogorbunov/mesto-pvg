import {PopupWithForm} from './PopupWithForm.js';

class PopupWithConfirmation extends PopupWithForm {
    constructor(popupSelector, handleSubmit, deleteCard) {
        super(popupSelector, handleSubmit);
        this._deleteCard = deleteCard;
        this._element.addEventListener('submit', () => {
            this._deleteCard(this._id, this._cardElement);
            this.close();
        });
    }

    open (id, cardElement) {
        this._cardElement = cardElement;
        this._id = id;
        super.open();
    }

    close() {
        this._cardElement = undefined;
        this._id = undefined;
        super.close();
    }
}

export { PopupWithConfirmation };