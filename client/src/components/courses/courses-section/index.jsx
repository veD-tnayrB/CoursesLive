import * as React from 'react';
import { getAllCourses } from 'src/services/courses';
import SearchCourses from '../search-courses';
import Course from './Course';
import './course-section.scss';

export default function CoursesSection({ courses, setCourses }) {

    React.useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        getAllCourses(signal)
            .then(response => {
                setCourses(response);
            })

        return () => controller.abort();
    }, []);

    const coursesElements = courses.map(course => (
        <Course key={course.id} course={course} />
    ));

    return (

        <div className="courses-section">
            <ul>
                {coursesElements}
            </ul>
        </div>
    )
}