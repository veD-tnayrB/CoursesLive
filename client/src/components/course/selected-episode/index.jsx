import * as React from 'react';
import { useCourseContext } from 'src/contexts/course/course.context';
import CreateEpisodeWarning from './create-episode-warning';
import Video from './video';
import './selected-episode.scss';

export default function SelectedEpisode() {
    const { selectedEpisode } = useCourseContext();
    const output = selectedEpisode ? <Video /> : <CreateEpisodeWarning />;

    return <section className="selected-episode-section">{output}</section>;
}
