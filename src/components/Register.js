import React, { useState } from 'react';
import AuthForm from "./AuthForm.js";


function Register(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onSubmit({ email, password });
    }

    return (
        <AuthForm
            buttonText="Sign up"
            email={email}
            footerLink="/signin"
            footerText="Already a member? Log in here!"
            handleSubmit={handleSubmit}
            onEmailChange={handleEmailChange}
            onPasswordChange={handlePasswordChange}
            password={password}
            title="Sign up"
        />
    )

}

export default Register;
