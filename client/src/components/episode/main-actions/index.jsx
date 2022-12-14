import { useEpisodeContext } from 'src/contexts/episode/episode.context';
import EpisodeCreator from './creator';
import Like from './like';
import More from './more';
import AdminEpisodesActions from './admin';
import OpenTest from './test/open';
import CreateTest from './test/create';
import './main-actions.scss';

export default function MainActions() {
	const { isCourseCreator, selectedEpisode } = useEpisodeContext();
	const episodeHasTest = selectedEpisode?.test;
	const canDisplayCreateTest = isCourseCreator && !episodeHasTest;
	const TestButton = canDisplayCreateTest ? CreateTest : OpenTest;

	return (
		<section className="main-actions">
			<EpisodeCreator />
			<div className="right">
				<TestButton test={selectedEpisode?.test} episodeHasTest={episodeHasTest} />
				{isCourseCreator && <AdminEpisodesActions />}
				<Like />
				<More />
			</div>
		</section>
	);
}
