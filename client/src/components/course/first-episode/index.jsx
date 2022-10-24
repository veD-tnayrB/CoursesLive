import { useCourseContext } from 'src/contexts/course/course.context';
import CreateEpisodeWarning from './create-episode-warning';
import './first-episode.scss';

export default function FirstEpisode() {
    const { course } = useCourseContext();
    const firstEpisode = course.episodes[0];

    const output = firstEpisode ? <div className=""></div> : <CreateEpisodeWarning />;

    return (
        <section className="first-episode-section">
            {output}
        </section>
    )
}