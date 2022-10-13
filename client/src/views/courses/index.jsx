import * as React from 'react';
import { CoursesContext } from 'src/contexts/course/course.context';
import SearchCourses from 'src/components/courses/search';
import Header from 'src/components/common/header';
import CoursesSection from 'src/components/courses/section';
import RegisterModal from 'src/components/courses/modals/register-modal';
import CreateModal from 'src/components/courses/modals/create-modal';

export default function Courses() {
    const [courses, setCourses] = React.useState([]);
    const [searchResults, setSearchResults] = React.useState([]);
    const [modals, setModals] = React.useState({ register: false, create: false, delete: false, edit: false });

    const contextValue = {
        courses,
        setCourses, 
        modals, 
        setModals
    }
    return (
        <CoursesContext.Provider value={contextValue}>
            <div className="courses-page page">
                <Header className="subtitle">
                    <h2>Courses</h2>
                </Header>
                <SearchCourses setSearchResults={setSearchResults} />
                <CoursesSection 
                    searchResults={searchResults}
                />
                <RegisterModal />
                <CreateModal />
            </div>
        </CoursesContext.Provider>
    )
}