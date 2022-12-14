import * as React from 'react';
import { useEpisodeContext } from 'src/contexts/episode/episode.context';
import './description.scss';

export default function EpisodeDescription() {
	const [isOpened, setIsOpened] = React.useState(false);
	const { selectedEpisode } = useEpisodeContext();
	const opened = isOpened ? 'opened' : '';
	const theresEnoughDescription = selectedEpisode.description.length > 100;
	const message = isOpened ? 'Show less' : 'Show more';

	function toggleOpen() {
		setIsOpened(!isOpened);
	}

	return (
		<article className={`episode-description ${opened}`}>
			<p>{selectedEpisode.description}</p>
			{theresEnoughDescription && <button onClick={toggleOpen}>{message}</button>}
		</article>
	);
}
