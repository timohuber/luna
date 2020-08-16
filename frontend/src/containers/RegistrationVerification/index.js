import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { verificationAction } from '../../store/actions/registerActions';

export default function VerificationForm(props) {
  const dispatch = useDispatch();
  const { push } = useHistory();
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    password_repeat: '',
    code: '',
    username: '',
    first_name: '',
    last_name: '',
  });

  const onChangeHandler = (e) => {
    const key = e.currentTarget.dataset.key;
    setFormState({
      ...formState,
      [key]: e.currentTarget.value,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    
    if (
      formState.email === '' ||
      formState.password === '' ||
      formState.code === '' ||
      formState.password_repeat === '' ||
      formState.username === '' ||
      formState.first_name === '' ||
      formState.last_name === ''
    ) {
      document.getElementById('verification-error').innerHTML =
        '<p>Please enter the empty fields</p>';
    } else if (formState.password !== formState.password_repeat) {
      document.getElementById('verification-error').innerHTML =
        '<p>Passwords did not match - please try again</p>';
    } else {
      document.getElementById('verification-error').innerHTML = '';

      console.log('validate user')
      

      const response = dispatch(verificationAction(formState.email, formState.code, formState.password, formState.password_repeat, formState.username, formState.first_name, formState.last_name));
      
      if(response) push('/login');

    }
  };

  return (
    <>
      <form id="verification-form" onSubmit={(e) => onSubmitHandler(e)}>
        <div className="page-title-container">
          <h1>Verification</h1>
        </div>
        <div className="form-wrapper register-validation">
          <div className="input-wrapper">
            <input
              id="verification-email"
              onChange={(e) => onChangeHandler(e)}
              data-key="email"
              type="email"
              placeholder="E-Mail address"
              className="required"
            />
            <p className="error">This field is required</p>
          </div>
          <div className="input-wrapper">
            <input
              id="verification-code"
              onChange={(e) => onChangeHandler(e)}
              data-key="code"
              type="text"
              placeholder="Validation code"
              className="required"
            />
            <p className="error">This field is required</p>
          </div>
          <div className="input-wrapper">
            <input
              id="verification-firstname"
              onChange={(e) => onChangeHandler(e)}
              data-key="first_name"
              type="text"
              placeholder="First name"
            />
          </div>
          <div className="input-wrapper">
            <input
              id="verification-lastname"
              onChange={(e) => onChangeHandler(e)}
              data-key="last_name"
              type="text"
              placeholder="Last name"
            />
          </div>
          <div className="input-wrapper">
            <input
              id="verification-username"
              onChange={(e) => onChangeHandler(e)}
              data-key="username"
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="input-wrapper">
            <input
              id="verification-location"
              onChange={(e) => onChangeHandler(e)}
              data-key="location"
              type="text"
              placeholder="Location"
            />
          </div>
          <div className="input-wrapper">
            <input
              id="verification-password"
              onChange={(e) => onChangeHandler(e)}
              data-key="password"
              type="password"
              placeholder="Password"
              className="required"
            />
            <p className="error">This field is required</p>
          </div>
          <div className="input-wrapper">
            <input
              id="verification-password-repeat"
              onChange={(e) => onChangeHandler(e)}
              data-key="password_repeat"
              type="password"
              placeholder="Password repeat"
              className="required"
            />
            <p className="error">This field is required</p>
          </div>
          <div className="input-wrapper">
            <div className="error" id="verification-error"></div>
          </div>
        </div>
        <button id="submit-verification" className="btn" type="submit">
          Finish registration
        </button>
      </form>
    </>
  );
}
