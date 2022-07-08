class Card {
    constructor (cardData, templateSelector, openImage, deleteCard, isliked, putLike, deleteLike) {
        this._link = cardData.link;
        this._name = cardData.name;
        this._counter = cardData.likes.length;
        this._openImage = openImage;
        this._templateSelector = templateSelector;
        this._id = cardData._id;
        this._deleteCard = deleteCard;
        this._putLike = putLike;
        this._deleteLike = deleteLike;
        this._isliked = isliked;

        this._cardElement = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
        this._cardTitle = this._cardElement.querySelector('.card__title');
        this._cardImage = this._cardElement.querySelector('.card__img');
        this._cardLikeBtn = this._cardElement.querySelector('.card__likebtn');
        this._cardDeleteBtn = this._cardElement.querySelector('.card__trash');
        this._cardLikesCounter = this._cardElement.querySelector('.card__like-counter');
        if(this._isliked) {
            this._cardLikeBtn.classList.add('cards__card-likebtn_activated');
        }
    }

    _like (evt) {
        if(this._isliked) {
            this._deleteLike(this._id)
            .then(res => {
                this._cardLikesCounter.textContent = res.likes.length;
                this._isliked = !this._isliked;
                evt.target.classList.toggle('cards__card-likebtn_activated');
            })
            .catch(err => console.log(err));
        } else {
            this._putLike(this._id)
            .then(res => {
                this._cardLikesCounter.textContent = res.likes.length;
                this._isliked = !this._isliked;
                evt.target.classList.toggle('cards__card-likebtn_activated');
            })
            .catch(err => console.log(err));
        }
    }

    _setEventListeners() {
        this._cardImage.addEventListener('click', () => this._openImage({name: this._name, link: this._link}));
        this._cardLikeBtn.addEventListener('click', this._like.bind(this));
        this._cardDeleteBtn.addEventListener('click', (evt) => {
            this._deleteCard(this._id, evt.target.closest('.card'));
        });
    }

    generateUserCard () {
        this._cardTitle.textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardLikesCounter.textContent = this._counter;
        this._setEventListeners();
        
        return this._cardElement;
    }

    generateDefaultCard () {
        this._cardTitle.textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardLikesCounter.textContent = this._counter;
        this._cardDeleteBtn.remove();
        this._setEventListeners();
        
        return this._cardElement;
    }
}

export {Card};