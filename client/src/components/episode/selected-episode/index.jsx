import * as React from 'react';
import { useEpisodeContext } from 'src/contexts/episode/episode.context';
import CreateEpisodeWarning from './create-episode-warning';
import Video from './video';
import './selected-episode.scss';

export default function SelectedEpisode() {
	const { selectedEpisode } = useEpisodeContext();
	const output = selectedEpisode?.video ? <Video /> : <CreateEpisodeWarning />;

	return <section className="selected-episode-section">{output}</section>;
}
