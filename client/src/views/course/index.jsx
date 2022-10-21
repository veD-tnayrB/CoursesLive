import * as React from 'react';
import { useParams } from "react-router-dom";
import { getOne } from "src/services/courses";
import useDocumentTitle from "src/hooks/useDocumentTitle"

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

    return (
        <div className="course-page">
            <h1>Hi im the course page </h1>
        </div>
    )
}