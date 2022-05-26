import React, { useState } from "react";
import AuthForm from './AuthForm.js';

function Login(props) {
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
        if (!email || !password) {
            return;
        }
        props.onSubmit({ email, password });
    }

    return (
        <AuthForm
            buttonText="Log in"
            email={email}
            footerLink="/signup"
            footerText="Not a member yet? Sing up here!"
            handleSubmit={handleSubmit}
            onEmailChange={handleEmailChange}
            onPasswordChange={handlePasswordChange}
            password={password}
            title="Log in"
        />
    );
}

export default Login;