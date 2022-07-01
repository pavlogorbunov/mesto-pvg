class UserInfo {
    constructor(name, occupation) {
        this._name = name;
        this._occupation = occupation;
        this._nameElement = document.querySelector('.profile__info-name');
        this._occupationElement = document.querySelector('.profile__info-titles');
        this._nameInputElement = document.querySelector('.popup__form-input_name_name');
        this._occupationInputElement = document.querySelector('.popup__form-input_name_occupation');
    }

    _setInputValues() {
        this._nameInputElement.value = this._name = this._nameElement.textContent;
        this._occupationInputElement.value = this._occupation = this._occupationElement.textContent;
    }

    getUserInfo() {
        this._setInputValues();
        return {name: this._name, occupation: this._occupation};
    }

    setUserInfo(data) {
        this._nameElement.textContent = this._name = data.name;
        this._occupationElement.textContent = this._occupation = data.occupation;
    }
}

export {UserInfo};