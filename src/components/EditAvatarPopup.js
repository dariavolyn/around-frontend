import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup(props) {
    const updateAvatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar: updateAvatarRef.current.value,
        })
    }
    return (
        <PopupWithForm title='Change profile picture' type='edit-avatar' isOpen={props.isOpen} buttonText='Save' onClose={props.onClose} onSubmit={handleSubmit}>
            <input ref={updateAvatarRef} required type="url" className="popup__input popup__input_type-edit-avatar"
                placeholder="Image link" />
            <span className="popup__error" id=""></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup