import React, { useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import PopupWithForm from './PopupWithForm.js';

function EditProfilePopup(props) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about)
    }, [currentUser, props.isOpen])

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateUser({ name, about: description });
    }

    return (
        <PopupWithForm title='Edit profile' type='edit-profile' isOpen={props.isOpen} buttonText='Save' onClose={props.onClose} onSubmit={handleSubmit}>
            <input required minLength="2" maxLength="40" type="text"
                className="popup__input popup__input__type-edit-profile" value={name || ''} onChange={handleNameChange} />
            <span className="popup__error" id=""></span>
            <input required minLength="2" maxLength="200" type="text"
                className="popup__input popup__input__type-edit-profile" value={description || ''} onChange={handleDescriptionChange} />
            <span className="popup__error" id=""></span>
        </PopupWithForm>)
}

export default EditProfilePopup