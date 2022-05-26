import React from 'react';

function PopupWithForm(props) {
    return (
        <>
            <div className={`popup popup__${props.type} ${props.isOpen ? 'popup_is_open' : ''}`}>
                <div className={`popup__container`}  >
                    <button type="button" aria-label="close" className="button popup__close" onClick={props.onClose}></button>
                    <h2 className={`popup__container-title`}>{props.title}</h2>
                    <form className="popup__form" action="#" onSubmit={props.onSubmit}>
                        {props.children}
                        <button type="submit" value="submit" className={`button popup__submit popup__button`}>{props.buttonText}</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default PopupWithForm;