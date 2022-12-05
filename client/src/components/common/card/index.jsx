import './card.scss';

export default function Card({ children, className = '' }) {
	return (
		<div className="card-item">
			<div className={`card ${className}`}>{children}</div>
		</div>
	);
}
