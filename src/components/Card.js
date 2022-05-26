import React from 'react';
import trashPath from '../images/trash.svg';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = props.card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (
        `card__delete ${isOwn ? 'card__delete_visible' : 'card__delete_hidden'}`
    );

    const isLiked = props.card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (
        `card__like ${isLiked ? 'card__like_act' : ''}`
    );

    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card)
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card)
    }

    return (
        <ul className="places__item">
            <li className="card">
                <button type="button" className={`button card__delete ${cardDeleteButtonClassName}`} onClick={handleDeleteClick}>
                    <img src={trashPath}
                        alt="Trash icon" /></button>
                <div className="card__image" style={{ backgroundImage: `url(${props.card.link})` }} onClick={handleClick}></div>
                <div className="card__caption">
                    <h2 className="card__text">{props.card.name}</h2>
                    <div className="card__like-container">
                        <button type="button" className={`button card__like ${cardLikeButtonClassName}`} onClick={handleLikeClick}></button>
                        <p className="card__like-count">{props.card.likes.length}</p>
                    </div>
                </div>
            </li>
        </ul>
    )
}

export default Card