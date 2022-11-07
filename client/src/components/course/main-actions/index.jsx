import { useCourseContext } from 'src/contexts/course/course.context';
import EpisodeCreator from './creator';
import Like from './like';
import More from './more';
import AdminEpisodesActions from './admin';
import './main-actions.scss';

export default function MainActions() {
    const { isCourseCreator } = useCourseContext();

    return (
        <section className="main-actions">
            <EpisodeCreator />
            <div className="right">
                {isCourseCreator && <AdminEpisodesActions />}
                <Like />
                <More />
            </div>
        </section>
    );
}
