import * as React from 'react';
import LoadingIcon from 'src/components/common/load';
import './action-button.scss';

export default function ActionButton({ className, children, title = "",  onClick, id = '', onMouseEnter, onMouseLeave}) {
    const [isLoading, setIsLoading] = React.useState(false);
    const loadingClass = isLoading ? 'loading' : '';
                            
    const buttonContent = isLoading ? <LoadingIcon /> : children;

    function handleClick(event) {
        if (typeof onClick !== 'function') return;
        onClick({isLoading, setIsLoading, event});
    }

    return (
        <>
            <button
                title={title}
                id={id}
                onClick={handleClick}
                className={`action-button ${loadingClass} ${className}`}
                onMouseEnter={onMouseEnter} 
                onMouseLeave={onMouseLeave}
            >
                {buttonContent}
            </button>
        </>
    )
}