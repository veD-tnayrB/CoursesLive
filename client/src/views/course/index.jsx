import * as React from 'react';
import { useParams } from "react-router-dom";
import { getOne } from "src/services/episodes";
import { CourseContext } from 'src/contexts/course/course.context';
import useDocumentTitle from "src/hooks/useDocumentTitle"
import SelectedEpisode from 'src/components/course/selected-episode';
import CreateEpisodeModal from 'src/components/course/modals/create-episode';
import EpisodeInfo from 'src/components/course/info';
import MainActions from 'src/components/course/main-actions';
import Episodes from 'src/components/course/episodes';
import './course.scss';

const MODALS = {
    createEpisode: { show: false, payload: {} }
};

export default function Course() {
    const { courseId, episodeId } = useParams();
    const [modals, setModals] = React.useState(MODALS);
    const [course, setCourse] = React.useState({ name: '', creator: '', episodes: [] });
    const [selectedEpisode, setSelectedEpisode] = React.useState({name: '', episodes: [], creator: ''});
    const [isLoading, setIsLoading] = React.useState(true);

    //useDocumentTitle(`${course.name} - Course`);

    React.useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        getOne(signal, courseId, episodeId)
            .then(episode => setSelectedEpisode(episode));

        return () => controller.abort();
    }, [episodeId, courseId]);

    const contextValue = {
        course, 
        setCourse,
        selectedEpisode, 
        setSelectedEpisode,
        isLoading,
        setIsLoading,
        modals, 
        setModals
    };
    return (
        <CourseContext.Provider value={contextValue}>
            <div className="course-page">
                <SelectedEpisode />
                
                <section className="hotbar">
                    <div className="episode-info-container">
                        <EpisodeInfo />
                        <MainActions />
                    </div>
                    <Episodes />
                </section>
            </div>
            <CreateEpisodeModal />
        </CourseContext.Provider>
    )
}