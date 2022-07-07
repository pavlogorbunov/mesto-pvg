class Api {
    constructor(options) {
        this._key = options.key;
        this._baseUrl = options.baseUrl;
    }

    _checkResponse(res) {
        if (res.ok) {    
            return res.json();
        } else {
            return Promise.reject(`Ошибка ${res.status}`);
        }
    }

    getInitialCards() {
        return fetch(this._baseUrl + '/cards', {
            headers: {
            authorization: this._key
            }
        }).then(this._checkResponse);
    }

    getUserInfo() {
        return fetch(this._baseUrl + '/users/me', {
            headers: {
            authorization: this._key
            }
        }).then(this._checkResponse);
    }

    patchUserInfo(data) {
        return fetch(this._baseUrl + '/users/me', {
            method: 'PATCH',
            headers: {
            authorization: this._key,
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        }).then(this._checkResponse);
    }

    postNewCard(data) {
        return fetch(this._baseUrl + '/cards', {
            method: 'POST',
            headers: {
            authorization: this._key,
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        }).then(this._checkResponse);
    }

    patchAvatar(link) {
        return fetch(this._baseUrl + '/users/me/avatar', {
            method: 'PATCH',
            headers: {
            authorization: this._key,
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({avatar: link})
        }).then(this._checkResponse);
    }

    deleteCard(id) {
        return fetch(this._baseUrl + '/cards/' + id, {
            method: 'DELETE',
            headers: {
            authorization: this._key,
            'Content-Type': 'application/json'
            }
        }).then(this._checkResponse);
    }

    putLike(id) {
        return fetch(this._baseUrl + '/cards/' + id + '/likes', {
            method: 'PUT',
            headers: {
            authorization: this._key
            }
        })
        .then(this._checkResponse);
    }

    deleteLike(id) {
        return fetch(this._baseUrl + '/cards/' + id + '/likes', {
            method: 'DELETE',
            headers: {
            authorization: this._key
            }
        })
        .then(this._checkResponse);
    }
}

export {Api};