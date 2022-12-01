import SelectedEpisode from '../selected-episode';
import CommentsPreload from './comments';
import EpisodesPreload from './episodes';
import EpisodeInfoPreload from './info';
import MainActionsPreaload from './main-actions';

export default function Preloads() {
	return (
		<div className="course-page preload">
			{/* <SelectedEpisode /> */}

			<section className="hotbar">
				<div className="episode-info-container">
					<EpisodeInfoPreload />
					<MainActionsPreaload />
					<CommentsPreload />
				</div>
				<EpisodesPreload />
			</section>
		</div>
	);
}
