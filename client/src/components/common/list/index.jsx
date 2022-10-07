import './list.scss';

export default function List({ children }) {

    return (
        <ul className="list">
            {children}
        </ul>
    )
}