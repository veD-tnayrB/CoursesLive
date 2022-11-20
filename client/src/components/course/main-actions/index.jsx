import { useCourseContext } from 'src/contexts/course/course.context';
import EpisodeCreator from './creator';
import Like from './like';
import More from './more';
import AdminEpisodesActions from './admin';
import OpenTest from './test/open';
import CreateTest from './test/create';
import './main-actions.scss';

export default function MainActions() {
	const { isCourseCreator, selectedEpisode } = useCourseContext();
	const episodeHasTest = selectedEpisode?.test;
	const testButton = episodeHasTest ? <OpenTest test={selectedEpisode?.test} /> : <CreateTest />;

	return (
		<section className="main-actions">
			<EpisodeCreator />
			<div className="right">
				{testButton}
				{isCourseCreator && <AdminEpisodesActions />}
				<Like />
				<More />
			</div>
		</section>
	);
}
