import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup(props) {
    const newCardNameRef = React.useRef();
    const newCardPicRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();

        props.onAddPlace({
            name: newCardNameRef.current.value,
            link: newCardPicRef.current.value
        })
    }

    return (
        <PopupWithForm title='New place' type='add-place' isOpen={props.isOpen} buttonText='Save' onClose={props.onClose} onSubmit={handleSubmit}>
            <input ref={newCardNameRef} required minLength="1" maxLength="30" type="text"
                className="popup__input popup__input-type-title" placeholder="Title" />
            <span className="popup__error"></span>
            <input ref={newCardPicRef} required type="url" className="popup__input popup__input-type-link"
                placeholder="Image link" />
            <span className="popup__error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup
