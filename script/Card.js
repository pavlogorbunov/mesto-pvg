class Card {
    constructor (cardData, templateSelector, openImage) {
        this._link = cardData.link;
        this._name = cardData.name;
        this._openImage = openImage;
        this._templateSelector = templateSelector;
    }

    _like (evt) {
        evt.currentTarget.classList.toggle('cards__card-likebtn_activated');
    }

    _deleteCard (evt) {
        evt.target.closest('.card').remove();
    }

    generateCard () {
        const newCard = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
        
        const newCardTitle = newCard.querySelector('.card__title');
        newCardTitle.textContent = this._name;
    
        const newCardImage = newCard.querySelector('.card__img');
        newCardImage.src = this._link;
        newCardImage.alt = this._name;
        newCardImage.addEventListener('click', () => this._openImage({name: this._name, link: this._link}));
    
        const newCardLikeBtn = newCard.querySelector('.card__likebtn');
        newCardLikeBtn.addEventListener('click', this._like);
    
        const newCardDeleteBtn = newCard.querySelector('.card__trash');
        newCardDeleteBtn.addEventListener('click', this._deleteCard);

        return newCard;
    }
}

export {Card};