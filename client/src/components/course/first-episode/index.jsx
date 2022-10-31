import { useCourseContext } from 'src/contexts/course/course.context';
import { FirstEpisodeContext } from './context';
import CreateEpisodeWarning from './create-episode-warning';
import EpisodeCreator from './creator';
import './first-episode.scss';
import EpisodeInfo from './info';
import Video from './video';

export default function FirstEpisode() {
    const { course } = useCourseContext();
    const firstEpisode = course.episodes[0];

    const output = firstEpisode ? <Video episode={firstEpisode} /> : <CreateEpisodeWarning />;

    return (
        <FirstEpisodeContext.Provider value={{ firstEpisode }}>
            <section className="first-episode-section">
                {output}
                <EpisodeInfo />
            </section>
            <EpisodeCreator />
        </FirstEpisodeContext.Provider>
    )
}