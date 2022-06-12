class Api {
    constructor({ baseUrl, headers }) {
        this.baseUrl = baseUrl
        this.headers = headers
    }

    _checkResponse(res) {
        return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
    }

    getUserInfo(token) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        })
            .then(this._checkResponse)
    }

    setUserInfo(token, { name, about }) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ name, about })
        })
            .then(this._checkResponse)
    }

    setUserPic(token, { avatar }) {
        return fetch(`${this.baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ avatar })
        })
            .then(this._checkResponse)
    }

    getCardsList(token) {
        return fetch(`${this.baseUrl}/cards`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        })
            .then(this._checkResponse)
    }

    addCard(token, { name, link }) {
        return fetch(`${this.baseUrl}/cards`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ name, link })
        })
            .then(this._checkResponse)
    }

    removeCard(cardID, token) {
        return fetch(`${this.baseUrl}/cards/${cardID}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        })
            .then(this._checkResponse)
    }

    addLike(cardID, token) {
        return fetch(`${this.baseUrl}/cards/likes/${cardID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        })
            .then(this._checkResponse)
    }

    deleteLike(cardID, token) {
        return fetch(`${this.baseUrl}/cards/likes/${cardID}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        })
            .then(this._checkResponse)
    }
}

const api = new Api({
    baseUrl: 'http://localhost:3000'
})

export default api;
