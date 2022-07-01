import {Popup} from './Popup.js';

class PopupWithImage extends Popup {
    constructor (popupSelector) {
        super(popupSelector);
        this._image = this._element.querySelector('.popup__pic-img');
        this._title = this._element.querySelector('.popup__pic-title');
    }

    open( data ) {
        this._image.src = data.link;
        this._image.alt = data.name;
        this._title.textContent = data.name;
        super.open();
    }
}

export {PopupWithImage};