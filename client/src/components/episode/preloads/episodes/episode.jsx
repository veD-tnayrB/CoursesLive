export default function EpisodePreload() {
	return (
		<li className="episode-item">
			<div className="episode">
				<div className="miniature-cont">
					<div className="episode-preview"></div>
				</div>

				<div className="info-container">
					<span className="title"></span>

					<p className="creator"></p>
					<p className="views"></p>
				</div>
			</div>
		</li>
	);
}
