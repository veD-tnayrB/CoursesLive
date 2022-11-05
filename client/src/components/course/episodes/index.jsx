import { useCourseContext } from 'src/contexts/course/course.context';
import Episode from './episode';
import './episodes.scss';

export default function Episodes() {
    const { course } = useCourseContext();

    const episodesElements = course.episodes.map(episode => (
        <Episode key={episode.id} episode={episode} />    
    ))

    return (
        <div className="episodes-section">
            <ul>
                {episodesElements}
            </ul>
        </div>
    )
}