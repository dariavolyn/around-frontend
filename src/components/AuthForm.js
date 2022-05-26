import React from 'react';
import { Link } from 'react-router-dom';

function AuthForm(props) {
    return (
        <div className="auth-form">
            <form name="" className="auth-form__form" action="#">
                <h2 className="auth-form__title">{props.title}</h2>
                <input name="email" type="email" value={props.email} onChange={props.onEmailChange} className="auth-form__input" placeholder="Email" />
                <input name="password" type="password" value={props.password} onChange={props.onPasswordChange} className="auth-form__input" placeholder="Password" />
                <button onClick={props.handleSubmit} className="button auth-form__button">{props.buttonText}</button>
            </form>
            <div className="auth-form__footer">
                <Link to={`${props.footerLink}`} className="auth-form__link">{props.footerText}</Link>
            </div>
        </div>
    )
}

export default AuthForm;