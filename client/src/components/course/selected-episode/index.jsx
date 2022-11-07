import * as React from 'react';
import { useCourseContext } from 'src/contexts/course/course.context';
import CreateEpisodeWarning from './create-episode-warning';
import Video from './video';
import './selected-episode.scss';

export default function SelectedEpisode() {
    const { course } = useCourseContext();
    const output = course.episodes.length > 0 ? <Video /> : <CreateEpisodeWarning />;

    return <section className="selected-episode-section">{output}</section>;
}
