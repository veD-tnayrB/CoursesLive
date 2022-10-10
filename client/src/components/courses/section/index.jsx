import * as React from 'react';
import { getAllCourses } from 'src/services/courses';
import List from 'src/components/common/list';
import PreloadList from 'src/components/common/card/preload/list';
import Course from './course';
import './course-section.scss';

export default function CoursesSection({ courses, setCourses, searchResults }) {
    const [isLoading, setIsLoading] = React.useState(true);
    const coursesToDisplay = searchResults.length > 0 ? searchResults : courses;

    React.useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        setIsLoading(true);

        getAllCourses(signal)
            .then(response => {
                setCourses(response);
                setIsLoading(false);
            })

        return () => controller.abort();
    }, []);

    if(isLoading) return <PreloadList />;

    const coursesElements = coursesToDisplay.map(course => (
        <Course key={course.id} course={course} />
    ));

    return (

        <div className="courses-section">
            <List>
                {coursesElements}
            </List>
        </div>
    )
}