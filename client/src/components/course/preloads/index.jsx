import LoadingIcon from 'src/components/common/load';
import CommentsPreload from './comments';
import EpisodesPreload from './episodes';
import EpisodeInfoPreload from './info';
import MainActionsPreaload from './main-actions';
import './preloads.scss';

export default function Preloads() {
	return (
		<div className="course-page preload">
			<div className="video">
				<LoadingIcon />
			</div>
			<section className="hotbar">
				<div className="episode-info-container">
					<EpisodeInfoPreload />
					<MainActionsPreaload />
					<CommentsPreload />
				</div>
				<EpisodesPreload showFilters />
			</section>
		</div>
	);
}
