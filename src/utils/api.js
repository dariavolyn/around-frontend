class Api {
    constructor({ baseUrl, headers }) {
        this.baseUrl = baseUrl
        this.headers = headers
    }

    _checkResponse(res) {
        return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
    }

    getUserInfo(data) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: "GET",
            headers: this.headers
        })
            .then(this._checkResponse)
    }

    setUserInfo({ name, about }) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify({ name, about })
        })
            .then(this._checkResponse)
    }

    getCardsList() {
        return fetch(`${this.baseUrl}/cards`, {
            method: "GET",
            headers: this.headers
        })
            .then(this._checkResponse)
    }

    addCard({ name, link }) {
        return fetch(`${this.baseUrl}/cards`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({ name, link })
        })
            .then(this._checkResponse)
    }

    removeCard(cardID) {
        return fetch(`${this.baseUrl}/cards/${cardID}`, {
            method: "DELETE",
            headers: this.headers
        })
            .then(this._checkResponse)
    }

    addLike(cardID) {
        return fetch(`${this.baseUrl}/cards/likes/${cardID}`, {
            method: "PUT",
            headers: this.headers
        })
            .then(this._checkResponse)
    }

    deleteLike(cardID) {
        return fetch(`${this.baseUrl}/cards/likes/${cardID}`, {
            method: "DELETE",
            headers: this.headers
        })
            .then(this._checkResponse)
    }

    setUserPic({ avatar }) {
        return fetch(`${this.baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify({ avatar })
        })
            .then(this._checkResponse)
    }
}

const api = new Api({
    baseUrl: 'about.students.nomoreparties.sbs',
    headers: {
        "Content-Type": "application/json"
    }
})

export default api;
