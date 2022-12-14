import { useEpisodeContext } from 'src/contexts/episode/episode.context';
import './episode-info.scss';

export default function EpisodeInfo() {
	const { selectedEpisode } = useEpisodeContext();

	return (
		<div className="info" title={selectedEpisode.title}>
			<h1>{selectedEpisode.title || 'Coming soon...'}</h1>
		</div>
	);
}
