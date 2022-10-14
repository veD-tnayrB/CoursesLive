import * as React from 'react';
import LoadingIcon from 'src/components/common/load';

export default function ActionButton({ className, children, onClick }) {
    const [isLoading, setIsLoading] = React.useState(false);
    const loadingClass = isLoading ? 'loading' : '';
                            
    const buttonContent = isLoading ? <LoadingIcon /> : children;

    return (
        <>
            <button
                onClick={(event) => onClick({isLoading, setIsLoading, event})}
                className={`${loadingClass} ${className}`}
            >
                {buttonContent}
            </button>
        </>
    )
}