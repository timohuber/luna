import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux'

import { baseUrl } from '../../../store/constants';
import { fetchUserData } from '../../../store/actions/loginActions'
import { switchProfileContainer } from '../../../store/actions/profileActions';

function EditProfileForm(props) {
    const dispatch = useDispatch()
    const [formState, setFormState] = useState({email: props.user.email});

    const onChangeHandler = (e) => {
        const key = e.currentTarget.name;
        setFormState({
            ...formState,
            [key]: e.currentTarget.value
        })
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const requiredFields = document.querySelectorAll('.required');
        let requiredFieldsOK = true;

        requiredFields.forEach(field => {
            if (!field.value) {
                field.nextElementSibling.style.opacity = '1';
                requiredFieldsOK = false;
            } else {
                field.nextElementSibling.style.opacity = '0'
            }
        });

        if (requiredFieldsOK) {
            const form = new FormData();

            for (const [key, value] of Object.entries(formState)) {
                form.append(key, value);
            }
            
            const imageInputs = document.querySelectorAll('input[type="file"]');
            imageInputs.forEach( input => {
                if(input.files[0]) {
                    form.append(input.name, input.files[0])
                }
            })

            const config = {
                method: 'PATCH',
                headers: new Headers({
                    'Authorization': `Bearer ${props.currentUser.accessToken}`,
                }),
                body: form
            };

            const loginResponse = fetch(baseUrl + 'users/me/', config)
            .then(res => {
                if (res.ok) {
                    dispatch(fetchUserData())
                    dispatch(switchProfileContainer('Reviews'))
                }
                return res.json()
            })
            .then(data => data)
            .catch(res => {
                return
            })
        }
    }

    return (
        <form id="edit-profile-form" onSubmit={ e => onSubmitHandler(e) }>
            <div className="input-wrapper">
                <label htmlFor="username">Username *</label>
                <input id="username" name="username" onChange={ e => onChangeHandler(e) }/>
            </div>
            <div className="input-wrapper">
                <label htmlFor="first_name">First name</label>
                <input id="first_name" name="first_name" onChange={ e => onChangeHandler(e) }/>
            </div>
            <div className="input-wrapper">
                <label htmlFor="last_name">Last name</label>
                <input id="last_name" name="last_name" onChange={ e => onChangeHandler(e) }/>
            </div>
            <div className="input-wrapper">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" value={props.user.email} readOnly={true}/>
            </div>
            <div className="input-wrapper">
                <label htmlFor="location">Location</label>
                <input id="location" name="location" onChange={ e => onChangeHandler(e) }/>
            </div>
            <div className="input-wrapper">
                <label htmlFor="phone">Phone</label>
                <input id="phone" name="phone" onChange={ e => onChangeHandler(e) }/>
            </div>
            <div className="input-wrapper">
                <label htmlFor="description">Description</label>
                <input id="description" name="description" onChange={ e => onChangeHandler(e) }/>
            </div>

            <div className="input-wrapper">
                <label htmlFor="banner-upload">Banner</label>
                <label htmlFor="banner-upload" className="btn">Choose a file..</label>
                <input type="file" id="banner-upload" name="banner" style={{display: 'none'}} />
            </div>
            <div className="input-wrapper">
                <label htmlFor="profile-picture-upload">Profile picture</label>
                <label htmlFor="profile-picture-upload" className="btn">Choose a file..</label>
                <input type="file" id="profile-picture-upload" name="profile_picture" style={{display: 'none'}} />
            </div>

            <div className="button-wrapper">
                <button className="btn" type="submit">Submit</button>
                <button className="blank">Delete account</button>
            </div>
        </form>
    )
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser    }
}
const connection = connect(mapStateToProps);
const ConnectedEditProfileForm = connection(EditProfileForm);

export default ConnectedEditProfileForm;
