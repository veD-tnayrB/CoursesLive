import { useCourseContext } from 'src/contexts/course/course.context';
import './episode-info.scss';

export default function EpisodeInfo() {
    const { selectedEpisode } = useCourseContext();

    return (
        <div className="info">
            <h1>{selectedEpisode.title}</h1>
        </div>
    )
}