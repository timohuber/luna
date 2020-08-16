import React from 'react';
import LoginForm from '../containers/LoginForm'

export default function LoginPage(props) {
    return (
        <>
            <div className="page-title-container">
                <h1>Login</h1>
            </div>
            <div className="center-content login-form-container">
                <LoginForm />
            </div>
        </>
    );
}
