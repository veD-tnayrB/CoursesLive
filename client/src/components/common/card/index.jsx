import './card.scss';

export default function Card({ children }) {


    return (
        <li className="card-item">
            <div className="card">
                {children}
            </div>
        </li>
    )
}