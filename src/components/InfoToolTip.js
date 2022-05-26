import React from 'react';
import errorImage from '../images/error.svg';
import successImage from '../images/success.svg';

function InfoToolTip(props) {
    const { isRegistered } = props;

    return (
        <div className={`popup popup__message ${props.isOpen ? 'popup_is_open' : ''}`}>
            <div className="overlay">
                <div className="popup__container popup__container_type-message">
                    <button aria-label="close" className="button popup__close popup__close-message"
                        type="button" onClick={props.onClose}></button>
                    <img className="popup__message-image" src={isRegistered ? successImage : errorImage} alt={isRegistered ? "Success" : "Error"} />
                    <h2 className="popup__message-text">{isRegistered ? "Success! You have now been registered." : "Oops, something went wrong! Please try again."}</h2>
                </div>
            </div>
        </div>
    )
}

export default InfoToolTip;