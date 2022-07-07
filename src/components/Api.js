class Api {
    constructor(options) {
        this._key = options.key;
        this._baseUrl = options.baseUrl;
    }

    getInitialCards() {
        return fetch(this._baseUrl+'/cards', {
            headers: {
            authorization: this._key
            }
        });
    }

    getUser() {
        return fetch(this._baseUrl+'/users/me', {
            headers: {
            authorization: this._key
            }
        });
    }

    getUserInfo() {
        return fetch(this._baseUrl+'/users/me', {
            headers: {
            authorization: this._key
            }
        });
    }

    patchUserInfo(data) {
        return fetch(this._baseUrl+'/users/me', {
            method: 'PATCH',
            headers: {
            authorization: this._key,
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        });
    }

    postNewCard(data) {
        return fetch(this._baseUrl+'/cards', {
            method: 'POST',
            headers: {
            authorization: this._key,
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        });
    }

    patchAvatar(link) {
        return fetch(this._baseUrl + '/users/me/avatar', {
            method: 'PATCH',
            headers: {
            authorization: this._key,
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({avatar: link})
        });
    }

    deleteCard(id) {
        return fetch(this._baseUrl + '/cards/' + id, {
            method: 'DELETE',
            headers: {
            authorization: this._key,
            'Content-Type': 'application/json'
            }
        });
    }

    putLike(id) {
        return fetch(this._baseUrl + '/cards/' + id + '/likes', {
            method: 'PUT',
            headers: {
            authorization: this._key
            }
        });
    }

    deleteLike(id) {
        return fetch(this._baseUrl + '/cards/' + id + '/likes', {
            method: 'DELETE',
            headers: {
            authorization: this._key
            }
        });
    }
}

export {Api};