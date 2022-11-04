import * as React from 'react';
import { useCourseContext } from 'src/contexts/course/course.context';
import { FirstEpisodeContext } from './context';
import { useParams } from 'react-router-dom';
import { getOne } from 'src/services/episodes';
import CreateEpisodeWarning from './create-episode-warning';
import EpisodeCreator from './creator';
import EpisodeInfo from './info';
import Video from './video';
import './first-episode.scss';

export default function FirstEpisode() {
    const { courseId, episodeId } = useParams();
    const { course } = useCourseContext();
    const [selectedEpisode, setSelectedEpisode] = React.useState({});
    
    React.useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        getOne(signal, courseId, episodeId)
        .then(episode => setSelectedEpisode(episode));

        return () => controller.abort();
    }, [episodeId]);


    const output = selectedEpisode ? <Video episode={selectedEpisode} /> : <CreateEpisodeWarning />;

    return (
        <FirstEpisodeContext.Provider value={{ selectedEpisode }}>
            <section className="first-episode-section">
                {output}
                <EpisodeInfo />
            </section>
            <EpisodeCreator />
        </FirstEpisodeContext.Provider>
    )
}