import React from 'react';
import { useNavigate } from 'react-router-dom';

import './modal.scss';

const Modal = ({ children, isCanceleable = false }) => {
    const navigateTo = useNavigate();

    const closeWindow = (event) => {
        if (isCanceleable) {
            const { className } = event.target;

            if (className === 'modal-window') {
                navigateTo(-1, { replace: true });
            }
        }
    }

    return (
        <div 
         className="modal-window"
         onClick={closeWindow}
        >
            { children }
        </div>
    )
}

export default Modal;