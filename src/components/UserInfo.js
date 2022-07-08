class UserInfo {
    constructor(name, occupation) {
        this._name = name;
        this._occupation = occupation;
        this._nameElement = document.querySelector('.profile__info-name');
        this._occupationElement = document.querySelector('.profile__info-titles');
        this._avatarElement = document.querySelector('.profile__avatar');
    }

    getUserInfo() {
        return {name: this._name, occupation: this._occupation};
    }

    setUserInfo(data) {
        this._name = data.name;
        this._occupation = data.about;
        this._avatar = data.avatar;
        this._id = data._id;
        
        this._nameElement.textContent = this._name;
        this._occupationElement.textContent = this._occupation;
        this._avatarElement.style.backgroundImage = `url('${this._avatar}')`;
    }
}

export {UserInfo};