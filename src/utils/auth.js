class Auth {
    constructor({ baseUrl, headers }) {
        this.baseUrl = baseUrl
        this.headers = headers
    }

    _checkResponse(res) {
        return res.ok ? res.json() : console.log(`Error: ${res.status}`)
    }

    registerUser({ email, password }) {
        return fetch(`${this.baseUrl}/signup`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        .then(this._checkResponse)
    }

    authorizeUser({ email, password }) {
        return fetch(`${this.baseUrl}/signin`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password }),
        })
            .then(this._checkResponse)
            .then((data) => {
                if (data.token) {
                    localStorage.setItem('token', data.token);
                    return data;
                } else {
                    return;
                }
            })
    }

    getContent(token) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(this._checkResponse)
            .then(data => data)
    }
}

const auth = new Auth({
    baseUrl: "about.students.nomoreparties.sbs"
}) 

export default auth;