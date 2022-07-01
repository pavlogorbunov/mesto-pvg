class Card {
    constructor (cardData, templateSelector, openImage) {
        this._link = cardData.link;
        this._name = cardData.place;
        this._openImage = openImage;
        this._templateSelector = templateSelector;

        this._cardElement = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
        this._cardTitle = this._cardElement.querySelector('.card__title');
        this._cardImage = this._cardElement.querySelector('.card__img');
        this._cardLikeBtn = this._cardElement.querySelector('.card__likebtn');
        this._cardDeleteBtn = this._cardElement.querySelector('.card__trash');
    }

    _like (evt) {
        evt.currentTarget.classList.toggle('cards__card-likebtn_activated');
    }

    _deleteCard (evt) {
        evt.target.closest('.card').remove();
    }

    _setEventListeners() {
        this._cardImage.addEventListener('click', () => this._openImage({name: this._name, link: this._link}));
        this._cardLikeBtn.addEventListener('click', this._like);
        this._cardDeleteBtn.addEventListener('click', this._deleteCard);
    }

    generateCard () {
        this._cardTitle.textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._setEventListeners();
        
        return this._cardElement;
    }
}

export {Card};