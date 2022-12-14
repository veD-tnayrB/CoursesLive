import './style.scss';

export default function NoContentMessage({ text, className = '' }) {
	return (
		<div className={`no-content-message ${className}`}>
			<p>{text}</p>
		</div>
	);
}
