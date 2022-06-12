import React, { useState, useEffect } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';

import AddPlacePopup from './AddPlacePopup.js';
import api from '../utils/api.js';
import auth from '../utils/auth.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import Footer from './Footer.js';
import Header from './Header.js';
import ImagePopup from './ImagePopup.js';
import InfoToolTip from './InfoToolTip.js';
import Login from './Login.js';
import Main from './Main.js';
import { ProtectedRoute } from './ProtectedRoute.js';
import Register from './Register.js';


function App() {
    const [addPlacePopupOpen, setIsAddPlaceOpen] = useState(false);
    const [cards, setCards] = useState([]);
    const [currentUser, setCurrentUser] = useState({});
    const [editAvatarPopupOpen, setIsEditAvatarOpen] = useState(false);
    const [editProfilePopupOpen, setIsEditProfileOpen] = useState(false);
    const [infoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [register, setRegister] = useState(false);
    const [userData, setUserData] = useState({});
    const history = useHistory();

    // currentUser
    useEffect(() => {
        const token = localStorage.getItem('token');
        api.getUserInfo(token)
            .then((res) => {
                setCurrentUser({
                    ...currentUser,
                    name: res.name,
                    about: res.about,
                    avatar: res.avatar,
                    _id: res._id
                })
            })
            .catch((err) => {
                console.log(err);
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // checking token
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            auth.getContent(token)
                .then((res) => {
                    setLoggedIn(true);
                    history.push('/main');
                    setUserData(res);
                })
                .catch((e) => console.log(e))
        }
    }, [history])

    // registering user
    function handleRegister({ email, password }) {
        auth.registerUser(email, password)
            .then((res) => {
                handleInfoToolTipOpen();
                if (res) {
                    setRegister(true);
                    history.push('/signin');
                }
                else {
                    return
                }
            }).catch(e => {
                console.log(e);
            })
    }


    // logging in
    function handleLogin({ email, password }) {
        auth.authorizeUser(email, password)
            .then((res) => {
                setUserData(email);
                if (res.token) {
                    setLoggedIn(true);
                    history.push('/main');
                }
            })
            .catch(err => console.log(err));
    }

    // logging out
    function handleLogOut() {
        setUserData({});
        setLoggedIn(false);
    }


    // cards
    useEffect(() => {
        const token = localStorage.getItem('token');
        api.getCardsList(token)
            .then((res) => {
                setCards(res)
            })
            .catch((err) => {
                console.log(err);
            });
    }, [userData]);

    function handleCardLike(card) {
        const token = localStorage.getItem('token');
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        if (!isLiked) {
            api.addLike(token, card._id)
                .then((newCard) => {
                    setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        else {
            api.deleteLike(token, card._id)
                .then((newCard) => {
                    setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }

    function handleCardDelete(card) {
        const token = localStorage.getItem('token');
        api.removeCard(card._id, token)
            .then(() => {
                const updatedList = cards.filter((c) => c._id !== card._id);
                setCards(updatedList);
            })
            .catch((err) => {
                console.log(err);
            });

    }

    //popups 
    function handleAddPlaceOpen() {
        setIsAddPlaceOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card)
    }

    function handleEditAvatarOpen() {
        setIsEditAvatarOpen(true);
    }

    function handleEditProfileOpen() {
        setIsEditProfileOpen(true);
    }

    function handleInfoToolTipOpen() {
        setIsInfoToolTipOpen(true);
    }

    function closeAllPopups() {
        setIsAddPlaceOpen(false);
        setIsEditAvatarOpen(false);
        setIsEditProfileOpen(false);
        setIsInfoToolTipOpen(false);
        setSelectedCard(null);
    }

    function handleUpdateUser(newUser) {
        const token = localStorage.getItem('token');
        api.setUserInfo(token, { name: newUser.name, about: newUser.about })
            .then((res) => {
                setCurrentUser({
                    ...currentUser,
                    name: newUser.name,
                    about: newUser.about
                })
            })
            .then(closeAllPopups)
            .catch((err) => {
                console.log(err);
            })
    }

    function handleUpdateAvatar(newUser) {
        const token = localStorage.getItem('token');
        api.setUserPic(token, { avatar: newUser.avatar })
            .then((res) => {
                console.log(res);
                setCurrentUser({
                    ...currentUser,
                    avatar: newUser.avatar,
                })
            })
            .then(closeAllPopups)
            .catch((err) => {
                console.log(err);
            })
    }

    function handleAddPlaceSubmit(card) {
        const token = localStorage.getItem('token');
        api.addCard(token, { name: card.name, link: card.link })
            .then((card) => {
                setCards([card, ...cards])
            })

            .then(closeAllPopups)
            .catch((err) => {
                console.log(err);
            })
    }

    return (

        <CurrentUserContext.Provider value={currentUser}>
            <div className="App">
                <Header loggedIn={loggedIn} userData={userData} onLogOut={handleLogOut} />

                <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}
                />

                <AddPlacePopup isOpen={addPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

                <EditAvatarPopup isOpen={editAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

                <EditProfilePopup isOpen={editProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

                <InfoToolTip isOpen={infoToolTipOpen} onClose={closeAllPopups} isRegistered={register} />

                <Switch>

                    <ProtectedRoute exact path="/main"
                        loggedIn={loggedIn}
                        component={Main}
                        cards={cards}
                        handleCardClick={handleCardClick}
                        onAddPlace={handleAddPlaceOpen}
                        onCardDelete={handleCardDelete}
                        onCardLike={handleCardLike}
                        onClose={closeAllPopups}
                        onEditAvatar={handleEditAvatarOpen}
                        onEditProfile={handleEditProfileOpen}>
                    </ProtectedRoute>

                    <Route exact path="/signup">
                        <Register onSubmit={handleRegister} />
                    </Route>

                    <Route exact path="/signin">
                        <Login onSubmit={handleLogin} />
                    </Route>

                    <Route exact path="/">
                        {loggedIn
                            ? <Redirect to="/main" />
                            : <Redirect to="/signin" />}
                    </Route>

                </Switch>
                {loggedIn && <Footer />}
            </div>
        </CurrentUserContext.Provider>

    )
}

export default App