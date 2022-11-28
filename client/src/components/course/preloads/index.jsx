import SelectedEpisode from '../selected-episode';
import EpisodeInfoPreload from './info';

export default function Preloads() {
	return (
		<div className="course-page preload">
			<SelectedEpisode />

			<section className="hotbar">
				<div className="episode-info-container">
					<EpisodeInfoPreload />
					<MainActions />
					{theresDescription && <EpisodeDescription />}
					<EpisodeComments />
				</div>
				<Episodes />
			</section>
		</div>
	);
}
