import { useCourseContext } from 'src/contexts/course/course.context';
import EpisodeComment from './comment';
import NewComment from './new-comment';
import './comments.scss';

export default function EpisodeComments() {
    const { selectedEpisode } = useCourseContext();

    const commentsElements = selectedEpisode.comments.map((comment) => <EpisodeComment comment={comment} />);

    return (
        <section className="comments-section">
            <NewComment />
            <ul className="comments">{commentsElements}</ul>
        </section>
    );
}
