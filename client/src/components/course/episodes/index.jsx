import * as React from 'react';
import { useCourseContext } from 'src/contexts/course/course.context';
import { useUserContext } from 'src/contexts/user/user.context';
import Episode from './episode';
import Filters from './filters';
import NewEpisode from './new-episode';
import './episodes.scss';

export default function Episodes() {
	const [selectedFilter, setSelectedFilter] = React.useState('All');
	const { user } = useUserContext();
	const { course } = useCourseContext();
	const canCreateEpisodes = user.role === 'admin' || user.role === 'teacher';

	const episodesElements = course.episodes.map((episode) => <Episode key={episode.id} episode={episode} />);

	return (
		<section className="episodes-section">
			<Filters selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />
			<ul>
				{canCreateEpisodes && <NewEpisode />}
				{episodesElements}
			</ul>
		</section>
	);
}
