import './modal.scss';

export default function ModalContainer({ className, children, show }) {
    if (!show) return;

    return (
        <main className={`modal-container ${className}`}>
            {children}
        </main>
    )
}