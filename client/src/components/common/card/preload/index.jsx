import Card from '../';
import './preload.scss';

export default function Preload() {
	return (
		<li>
			<Card className="preload">
				<header>
					<div className="info-container">
						<div className="title"></div>
						<div className="description"></div>
					</div>

					<div className="img"></div>
				</header>
				<div className="actions-container">
					<div className="default-button"></div>
				</div>
			</Card>
		</li>
	);
}
