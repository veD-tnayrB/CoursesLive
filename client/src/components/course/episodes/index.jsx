import { useParams } from 'react-router-dom';
import { useCourseContext } from 'src/contexts/course/course.context';
import Episode from './episode';

export default function Episodes() {
    const { course } = useCourseContext();

    const episodesElements = course.episodes.map(episode => (
        <Episode key={episode.id} episode={episode} />    
    ))

    return (
        <div className="section">
            <ul>
                {episodesElements}
            </ul>
        </div>
    )
}