import './style.scss';

export default function NoContentMessage({ text }) {
	return (
		<div className="no-content-message">
			<p>{text} 😴</p>
		</div>
	);
}
