import React from 'react';

function ImagePopup(props) {
    return (
        <div className={`popup popup__image-preview ${props.card && 'popup_is_open'}`}>
            <div className="overlay">
                <div className="popup__container popup__container_type-image-preview">
                    <button aria-label="close" className="button popup__close popup__close-image-preview"
                        type="button" onClick={props.onClose}></button>
                    <img className="popup__image" src={props.card?.link} alt={props.card?.name} />
                    <h2 className="popup__caption">{props.card?.name}</h2>
                </div>
            </div>
        </div>

    )
}

export default ImagePopup;