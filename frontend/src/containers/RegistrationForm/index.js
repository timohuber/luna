import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'

import { registerAction } from '../../store/actions/registerActions';

export default function RegistrationForm(props) {
    const dispatch = useDispatch();
    const {push} = useHistory();
    const [formState, setFormState] = useState({email: ''});

    const onChangeHandler = (e) => {
        const key = e.currentTarget.dataset.key;
        setFormState({
            ...formState,
            [key]: e.currentTarget.value
        })
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (formState.email === '') {
            document.getElementById('register-error').innerHTML = '<p>Please enter email address</p>';
        } else {
            document.getElementById('register-error').innerHTML = '';
            dispatch(registerAction(formState.email));
            
        }
    }

    return (
        <>
        <form id="register-form" onSubmit={ e => onSubmitHandler(e) }>
        <div className="page-title-container">
                <h1>Registration</h1>
            </div>
            <input id="register-email" onChange={ e => onChangeHandler(e) } data-key="email" type="email" placeholder="E-Mail address" />
            <div className="error" id="register-error"></div>
            <button id="submit-register" className="btn" type="submit">Register</button>
        </form>
        </>
    )
}