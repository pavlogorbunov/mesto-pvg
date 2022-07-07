class UserInfo {
    constructor(name, occupation) {
        this._name = name;
        this._occupation = occupation;
        this._nameElement = document.querySelector('.profile__info-name');
        this._occupationElement = document.querySelector('.profile__info-titles');
        this._avatarElement = document.querySelector('.profile__avatar');
        this._nameInputElement = document.querySelector('.popup__form-input_name_name');
        this._occupationInputElement = document.querySelector('.popup__form-input_name_occupation');
    }

    getUserInfo() {
        return {name: this._name, occupation: this._occupation};
    }
}

export {UserInfo};