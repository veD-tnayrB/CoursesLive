import * as React from 'react';
import { useParams } from "react-router-dom";
import { getOne } from "src/services/courses";
import { CourseContext } from 'src/contexts/course/course.context';
import useDocumentTitle from "src/hooks/useDocumentTitle"
import FirstEpisode from 'src/components/course/first-episode';
import CreateEpisodeModal from 'src/components/course/modals/create-episode';

const MODALS = {
    createEpisode: { show: false, payload: {  } }
};

export default function Course() {
    const { courseId } = useParams();
    const [modals, setModals] = React.useState(MODALS)
    const [course, setCourse] = React.useState({name: '', episodes: [], creator: ''});
    const [isLoading, setIsLoading] = React.useState(true);

    useDocumentTitle(`${course.name} - Course`);

    React.useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        setIsLoading(true);

        getOne(signal, courseId)
        .then(response => {
            setCourse(response);
            setIsLoading(false);
        });

        return () => controller.abort();
    }, [courseId])

    const contextValue = {
        course,
        setCourse,
        isLoading,
        setIsLoading,
        modals, 
        setModals
    };
    return (
        <CourseContext.Provider value={contextValue}>
            <div className="course-page">
                <FirstEpisode />
            </div>
            <CreateEpisodeModal />
        </CourseContext.Provider>
    )
}