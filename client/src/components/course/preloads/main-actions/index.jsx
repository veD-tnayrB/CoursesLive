import AdminEpisodesActionsPreaload from './admin';
import EpisodeCreatorPreaload from './creator';

export default function MainActionsPreaload() {
	return (
		<section className="main-actions">
			<EpisodeCreatorPreaload />
			<div className="right">
				{testButton}
				{isCourseCreator && <AdminEpisodesActionsPreaload />}
				<Like />
				<More />
			</div>
		</section>
	);
}
