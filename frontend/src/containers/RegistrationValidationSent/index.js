import React from "react";
import { useDispatch } from "react-redux";
import { verificationProceedAction } from "../../store/actions/registerActions";

export default function RegistrationValidationSent(props) {
    const dispatch = useDispatch();
    const onSubmitHandler = (e) => {
        
        console.log('inonSubmithandler')
        dispatch(verificationProceedAction());
    };

    return (
        <>
        <div className="center-container">
        <div className="page-title-container">
                <h1>Registration</h1>
            </div>
            <p>
                Thanks for your registration.
        <br />
        Our hard working monkeys are preparing a digital message called E-Mail
        that will be sent to you soon.
        <br />
        Since monkeys arent good in writing the message could end up in you junk
        folder.
        <br />
        Our apologies for any inconvienience.
        <br /> Thank you for your patience.
      </p>
            <button id="proceed-validation" className="btn" onClick={e => onSubmitHandler(e)} >
                Proceed
      </button>
        </div>
        </>
    );
}
