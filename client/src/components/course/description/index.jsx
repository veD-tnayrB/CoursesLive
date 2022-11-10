import * as React from 'react';
import { useCourseContext } from 'src/contexts/course/course.context';
import './description.scss';

export default function EpisodeDescription() {
	const [isOpened, setIsOpened] = React.useState(false);
	const { selectedEpisode } = useCourseContext();
	const opened = isOpened ? 'opened' : '';

	const theresEnoughDescription = selectedEpisode.description.length > 100;

	function toggleOpen() {
		setIsOpened(!isOpened);
	}

	return (
		<article className={`episode-description ${opened}`}>
			<p>{selectedEpisode.description}</p>
			{theresEnoughDescription && <button onClick={toggleOpen}>Show more</button>}
		</article>
	);
}
