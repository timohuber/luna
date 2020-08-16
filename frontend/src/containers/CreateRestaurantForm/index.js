import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { baseUrl } from '../../store/constants'

function CreateRestaurantForm(props) {
    const {push} = useHistory();
    const [formState, setFormState] = useState({email: '', password: ''});
    const [restaurantImageRef, setRestaurantImageRef] = useState(React.createRef());

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
        const image = document.getElementById('image-upload').files[0]
        let requiredFieldsOK = true;

        requiredFields.forEach(field => {
            if (!field.value) {
                field.nextElementSibling.style.opacity = '1';
                requiredFieldsOK = false;
            } else {
                field.nextElementSibling.style.opacity = '0'
            }
        });

        if (!image) {
            document.getElementById('image-upload').nextElementSibling.style.opacity = '1'
        } else {
            document.getElementById('image-upload').nextElementSibling.style.opacity = '0'
        }

        if (requiredFieldsOK && image) {
            const form = new FormData();

            console.log('send new restaurant')

            for (const [key, value] of Object.entries(formState)) {
                form.append(key, value);
            }
            form.append('image', image);

            const config = {
                method: 'POST',
                headers: new Headers({
                    'Authorization': `Bearer ${props.currentUser.accessToken}`
                }),
                body: form
            };

            const loginResponse = fetch(baseUrl + 'restaurants/', config)
            .then(res => {
                if (res.ok) {
                    push('/')
                }
                return res.json()
            })
            .then(data => data)
            .catch(res => {
                return
            })
        }
    }
    console.log(props)
    return (
        <form id="create-restaurant-form" onSubmit={ e => onSubmitHandler(e) }>
            <div className="form-subtitle">
                <p>Basic</p>
            </div>
            <div className="form-wrapper">
                <div className="input-wrapper">
                    <label htmlFor="name">Name *</label>
                    <input id="name" className="required" name="name" onChange={ e => onChangeHandler(e) }/>
                    <p className="error">This field is required</p>
                </div>
                <div className="input-wrapper">
                    <label htmlFor="category">Category *</label>
                    <select id="category" className="required" name="category" onChange={ e => onChangeHandler(e) }>
                        <option disabled selected value> select category </option>
                        {props.helper.categories.map(category => {
                            return <option value={category.id}>{category.name}</option>
                        })}
                    </select>
                    <p className="error">This field is required</p>
                </div>                

                <div className="input-wrapper">
                    <label htmlFor="country">Country *</label>
                    <input id="country" className="required" name="country" onChange={ e => onChangeHandler(e) }/>
                    <p className="error">This field is required</p>
                </div>
            </div>

            <div className="form-subtitle">
                <p>Address</p>
            </div>
            <div className="form-wrapper">
                <div className="input-wrapper">
                    <label htmlFor="street">Street *</label>
                    <input id="street" className="required" name="street" onChange={ e => onChangeHandler(e) }/>
                    <p className="error">This field is required</p>
                </div>
                <div className="input-wrapper">
                    <label htmlFor="city">City *</label>
                    <input id="city" className="required" name="city" onChange={ e => onChangeHandler(e) }/>
                    <p className="error">This field is required</p>
                </div>
                <div className="input-wrapper">
                    <label htmlFor="zip">Zip *</label>
                    <input id="zip" className="required" name="zip" onChange={ e => onChangeHandler(e) }/>
                    <p className="error">This field is required</p>
                </div>
            </div>

            <div className="form-subtitle">
                <p>Contact</p>
            </div>
            <div className="form-wrapper">
                <div className="input-wrapper">
                    <label htmlFor="website">Website</label>
                    <input id="website" name="website" onChange={ e => onChangeHandler(e) }/>
                </div>
                <div className="input-wrapper">
                    <label htmlFor="phone">Phone *</label>
                    <input id="phone" className="required" name="phone" onChange={ e => onChangeHandler(e) }/>
                    <p className="error">This field is required</p>
                </div>
                <div className="input-wrapper">
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" onChange={ e => onChangeHandler(e) }/>
                </div>
            </div>

            <div className="form-subtitle">
                <p>Details</p>
            </div>
            <div className="form-wrapper">
                <div className="input-wrapper">
                    <label htmlFor="opening_hours">Opening hours</label>
                    <input id="opening_hours"  name="opening_hours" onChange={ e => onChangeHandler(e) }/>
                </div>
                <div className="input-wrapper">
                    <label htmlFor="price_level">Price level *</label>
                    <input id="price_level" className="required" name="price_level" type="number" min="1" max="4" onChange={ e => onChangeHandler(e) }/>
                    <p className="error">This field is required</p>
                </div>
                <div className="input-wrapper">
                    <label htmlFor="image-upload">Image</label>
                    <label htmlFor="image-upload" className="btn">Choose a file..</label>
                    <input type="file" id="image-upload" name="image" ref={restaurantImageRef} style={{display: 'none'}} />
                    <p className="error">This field is required</p>
                </div>
            </div>
            <button className="btn" type="submit">Submit</button>
        </form>
    )
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser,
        helper: state.helper
    }
}
const connection = connect(mapStateToProps);
const ConnectedCreateRestaurantForm = connection(CreateRestaurantForm);

export default ConnectedCreateRestaurantForm;