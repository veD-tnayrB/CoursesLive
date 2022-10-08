import './card.scss';

export default function Card({ children, className = '' }) {


    return (
        <li className="card-item">
            <div className={`card ${className }`}>
                {children}
            </div>
        </li>
    )
}