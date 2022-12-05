import Card from 'src/components/common/card';

export default function CoursePreload() {
	return (
		<li>
			<div className="course preload">
				<div className="cover-container">
					<div className="cover" alt=""></div>
				</div>

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
			</div>
		</li>
	);
}
