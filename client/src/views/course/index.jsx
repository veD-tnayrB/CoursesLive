import * as React from 'react';
import { useParams } from "react-router-dom";
import { getOne } from "src/services/courses";
import { CourseContext } from 'src/contexts/course/course.context';
import useDocumentTitle from "src/hooks/useDocumentTitle"
import VideoSection from 'src/components/course/video-section';

export default function Course() {
    const { courseId } = useParams();
    const [course, setCourse] = React.useState({name: ''});
    const [isLoading, setIsLoading] = React.useState(true);

    useDocumentTitle(`${course.name} - Course`);

    React.useEffect(() => {
        setIsLoading(true);

        getOne(courseId)
        .then(response => {
            console.log(response)
            setCourse(response);
            setIsLoading(false);
        })
    }, [courseId])

    const contextValue = {
        course,
        setCourse,
        isLoading,
        setIsLoading
    };
    return (
        <CourseContext.Provider value={contextValue}>
            <div className="course-page">
                <VideoSection />
            </div>
        </CourseContext.Provider>
    )
}