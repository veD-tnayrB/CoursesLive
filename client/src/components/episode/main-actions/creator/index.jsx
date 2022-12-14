import * as React from 'react';
import { useEpisodeContext } from 'src/contexts/episode/episode.context';
import { IMAGES_ROUTES } from 'src/services/config';
import './creator.scss';

export default function EpisodeCreator() {
	const { course } = useEpisodeContext();
	const creator = course.creator;

	return (
		<div className="creator-info">
			<img src={`${IMAGES_ROUTES}${creator.profileImage}`} />
			<h3>
				{creator.name} {creator.lastName}
			</h3>
		</div>
	);
}
