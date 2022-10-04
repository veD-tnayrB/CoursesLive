import React from "react";
import { Link } from 'react-router-dom';
import ValidationInput from "src/components/common/validation-input";
import { multiInputHandleChange } from "src/utils/input-handle-changes";
import './form.scss';

const namePattern = /^[A-Z]{1,1}[a-z]+$/;
const lastNamePattern = /^[A-Z]{1,1}[a-z]+$/;
const mailPattern = /^[a-z_0-9]+@[a-z_]+?\.[a-zA-Z]{2,3}$/;
const passwordPattern = /[\w]{8,16}/;

const INITIAL_VALUES = {
    name: '',
    lastName: '',
    mail: '',
    password: ''
}

export default function SignupForm() {
    const [values, setValues] = React.useState(INITIAL_VALUES);

    const handleChange = (event) => multiInputHandleChange(event, setValues);

    return (
        <form className="sign-up-form">
            <div className="first-row">
                <ValidationInput
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    placeholder="Name"
                    autocomplete="off"
                    validation={namePattern} 
                />
                <ValidationInput 
                    type="text"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    autocomplete="off"
                    validation={lastNamePattern} 
                />
            </div>

            <ValidationInput 
                type="text"
                name="mail"
                value={values.mail}
                onChange={handleChange}
                placeholder="Mail"
                autocomplete="off"
                validation={mailPattern} 
            />
            <ValidationInput 
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                placeholder="Password"
                autocomplete="off"
                validation={passwordPattern} 
            />

            <div className="actions-container">
                <Link to="/login"> Log in!</Link>

                <button className="primary-button">
                    Register
                </button>
            </div>
        </form>
    )
}