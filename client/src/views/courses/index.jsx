import * as React from 'react';
import SearchCourses from 'src/components/courses/search-courses';
import Header from 'src/components/common/header';
import CoursesSection from 'src/components/courses/courses-section';
import './courses.scss';

export default function Courses() {
    const [courses, setCourses] = React.useState([]);

    return (
        <div className="courses-page">
            <Header className="subtitle">
                <h2>Courses</h2>
            </Header>
            <SearchCourses setCourses={setCourses} />
            <CoursesSection 
                courses={courses} 
                setCourses={setCourses} 
            />
        </div>
    )
}