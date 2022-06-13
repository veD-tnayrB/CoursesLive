import React from 'react';
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import './input.scss';

const Input = ({ label, input, value, onChange, errorMessage, isCorrect }) => {

    const isValueEmpty = value === '';

    const inputStyle = {
        border: isValueEmpty || `.15rem solid ${isCorrect ? '#71df67' : '#dd6f6f'}`
    }

    return (
        <div className="input">
            <label htmlFor={input.name}>{label}</label>
            <div 
             className="input-container"
            >
                <input
                 type={input.type}
                 name={input.name}
                 id={input.name}
                 value={value}
                 placeholder={input.placeholder}
                 onChange={onChange}
                 style={inputStyle}
                />

                {
                    isValueEmpty || (
                        isCorrect ?
                        <CheckCircleIcon className="icon correct" />
                        :
                        <BlockIcon className="icon incorrect" />
                        
                    )               
                }
            </div>
            {
                isValueEmpty || isCorrect ||
                <span className="error-message">{errorMessage}</span>
            }
        </div>
    )
}

export default Input;