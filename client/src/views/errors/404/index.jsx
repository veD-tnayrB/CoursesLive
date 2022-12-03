import { Link } from 'react-router-dom';
import './styles.scss';

export default function Error404() {
	return (
		<div className="page-404">
			<img src="/public-assets/404/404.svg" alt="" />
			<div className="main-content">
				<h1>We could not find what you are looking for, try again later</h1>

				<Link to="/" className="primary-button">
					Back Home
				</Link>
			</div>
		</div>
	);
}
