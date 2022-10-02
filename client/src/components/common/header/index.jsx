import './header.scss';

export default function Header({ children, className = '' }) {
    return (
        <header className={`main-header ${className}`}>
            {children}
        </header>
    )
}