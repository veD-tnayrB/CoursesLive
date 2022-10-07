import './modal.scss';

export default function Modal({ children }) {

    return (
        <section className="modal">
            {children}
        </section>
    )
}