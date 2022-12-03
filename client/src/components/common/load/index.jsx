import './load.scss';

export default function LoadingIcon({ text = '' }) {
	return (
		<div className="loading">
			{text}
			<div className="lds-dual-ring loading-icon"></div>
		</div>
	);
}
