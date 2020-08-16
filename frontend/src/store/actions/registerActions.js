import { baseUrl, VERIFICATION_CODE_REQUESTED, VERIFICATION_CONFORMED, UPDATE_CURRENT_USER } from '../constants'


export const userVerification = () => {
    return {
        type: UPDATE_CURRENT_USER,
    }
}

export const userRegistration = () => {
    return {
        type: VERIFICATION_CODE_REQUESTED,
    }
}
export const userRegistrationProceedValidation = () => {
    return {
        type: VERIFICATION_CONFORMED,
    }
}

export const registerAction = (email) => (dispatch, getState) => {

    const config = {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
            email
        }),
    }

    const registrationResponse = fetch(baseUrl + 'registration/', config)
    .then(response => {
        if (response.status == 204) {
            document.getElementById('register-error').innerHTML = '<p style="color:green">E-Mail address registered - please check your E-Mail account.</p>';
        } else {
            document.getElementById('register-error').innerHTML = '<p>Not possible to create account - this is not a valid email address or address already used.</p>';
            throw new Error(response.statusText);
            return
        }
    }).then(dispatch(userRegistration()))
    .catch(response => {
        return response
    })

}

export const verificationProceedAction = () => (dispatch, getState) => {
    console.log('in the register actions')
    dispatch(userRegistrationProceedValidation())
}

export const verificationAction = (email, code, password, password_repeat, username, first_name, last_name) => async (dispatch, getState) => {
    
    const config = {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
            email,
            code,
            password,
            password_repeat,
            username,
            first_name,
            last_name
        }),
    }

    const response = await fetch(baseUrl + 'registration/validation/', config)
    try{
        if (response.status == 401) {
            document.getElementById('verification-error').innerHTML = '<p>No active account found with the given credentials.</p>';
            document.getElementById('verification-password').value = '';
        } else {
            document.getElementById('verification-error').innerHTML = '';
        }
    }

    

    catch(err){
        console.log('error', err)
    }

    let data = await response
    console.log('response data', data.body)
    return true;
    /* const verificationResponse = fetch(baseUrl + 'registration/validation/', config)
    .then(response => {
        if (response.status == 401) {
            document.getElementById('verification-error').innerHTML = '<p>No active account found with the given credentials.</p>';
            document.getElementById('verification-password').value = '';
        } else {
            document.getElementById('verification-error').innerHTML = '';
            console.log(getState);
            push('/login');
            //dispatch(userVerification());
        }
    })
    .catch(response => {
        return
    }) */
}