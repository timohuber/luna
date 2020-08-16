import React, { useState, } from "react";
import { connect } from "react-redux";
import RegistrationForm from "../containers/RegistrationForm";
import RegistrationValidationSent from "../containers/RegistrationValidationSent";
import VerificationForm from "../containers/RegistrationVerification";



function RegistrationPage(props) {


    const [user, setUser] = useState({});
    let showContainer;



    if (props.currentUser.registration.verificationCodeRequested && props.currentUser.registration.verificationConformed) {
        showContainer = <VerificationForm />
    }
    else if (props.currentUser.registration.verificationCodeRequested) {
        showContainer = <RegistrationValidationSent />
    } else {
        showContainer = <RegistrationForm />
    }


    return (
        <>
            
            <div className="center-content login-form-container">
                {showContainer}
                {/* <VerificationForm /> */}
            </div>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser,
    };
};
const connection = connect(mapStateToProps);
const ConnectedRegistrationPage = connection(RegistrationPage);

export default ConnectedRegistrationPage;
