import * as React from 'react';
import LoadingIcon from 'src/components/common/load';

export default function ActionButton({ className, children, onClick }) {
    const [isLoading, setIsLoading] = React.useState(false);
    const loadingClass = isLoading ? 'loading' : '';

    const buttonContent = isLoading ? <LoadingIcon /> : children;

    return (
        <>
            <button
                onClick={() => onClick(isLoading, setIsLoading)}
                className={`default-button ${loadingClass} ${className}`}
            >
                {buttonContent}
            </button>
        </>
    )
}