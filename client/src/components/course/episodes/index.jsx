import * as React from 'react';
import { useParams } from 'react-router-dom';
import { EpisodesContext } from './context';
import { episodeService } from 'src/services/episodes';
import Filters from './filters';
import CreateEpisodeModal from '../modals/create-episode';
import EpisodesList from './list';
import './episodes.scss';

export default function Episodes() {
	const [selectedFilter, setSelectedFilter] = React.useState('All');
	const [episodes, setEpisodes] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);
	const { courseId, episodeId } = useParams();

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

	const contextValue = {
		episodes,
		setEpisodes,
		isLoading,
	};
	return (
		<EpisodesContext.Provider value={contextValue}>
			<section className="episodes-section">
				<Filters selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />
				<EpisodesList />
				<CreateEpisodeModal />
			</section>
		</EpisodesContext.Provider>
	);
}
