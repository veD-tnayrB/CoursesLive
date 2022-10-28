import { useCourseContext } from 'src/contexts/course/course.context';
import CreateEpisodeWarning from './create-episode-warning';
import './first-episode.scss';
import Video from './video';

export default function FirstEpisode() {
    const { course } = useCourseContext();
    const firstEpisode = course.episodes[0];

    const output = firstEpisode ? <Video episode={firstEpisode} /> : <CreateEpisodeWarning />;

    return (
        <section className="first-episode-section">
            {output}
        </section>
    )
}