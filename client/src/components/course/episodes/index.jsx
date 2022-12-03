import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useUserContext } from 'src/contexts/user/user.context';
import { EpisodesContext } from './context';
import { episodeService } from 'src/services/episodes';
import Episode from './episode';
import Filters from './filters';
import NewEpisode from './new-episode';
import CreateEpisodeModal from '../modals/create-episode';
import './episodes.scss';
import EpisodesPreload from '../preloads/episodes';

export default function Episodes() {
	const [selectedFilter, setSelectedFilter] = React.useState('All');
	const [episodes, setEpisodes] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);
	const { user } = useUserContext();
	const { courseId, episodeId } = useParams();
	const canCreateEpisodes = user.role === 'admin' || user.role === 'teacher';

	React.useEffect(() => {
		setIsLoading(true);

		const controller = new AbortController();
		const signal = controller.signal;

		episodeService
			.getEpisodes(signal, selectedFilter, courseId)
			.then((response) => {
				setEpisodes(response);
				setIsLoading(false);
			})
			.finally(() => setIsLoading(false));

		return () => controller.abort();
	}, [courseId, selectedFilter, episodeId]);

	if (isLoading) return <EpisodesPreload />;

	const episodesElements = episodes.map((episode) => <Episode key={episode.id} episode={episode} />);

	const contextValue = {
		episodes,
		setEpisodes,
	};
	return (
		<EpisodesContext.Provider value={contextValue}>
			<section className="episodes-section">
				<Filters selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />
				<ul>
					{canCreateEpisodes && <NewEpisode />}
					{episodesElements}
				</ul>
				<CreateEpisodeModal />
			</section>
		</EpisodesContext.Provider>
	);
}
