import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

    return (

        <div className="main">

            <div className="profile">
                <div className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }}>
                    <button type="button" className="button profile__avatar-edit" onClick={props.onEditAvatar}></button>
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button aria__label="edit" className="profile__edit button" type="button" onClick={props.onEditProfile}></button>
                    <p className="profile__title">{currentUser.about}</p>
                </div>
                <button aria__label="add" type="button" className="button profile__add" onClick={props.onAddPlace}></button>
            </div>

            <div className="places">
                <ul className="places__list">
                    {props.cards.map((card) => (
                        <Card
                            key={card._id}
                            card={card}
                            onCardClick={props.handleCardClick}
                            onCardLike={props.onCardLike}
                            onCardDelete={props.onCardDelete}
                        />))}
                </ul>
            </div>

        </div>
    )
}


export default Main;