import { useCoursesContext } from "src/contexts/courses/courses.context";
import { useUserContext } from "src/contexts/user/user.context";
import List from "src/components/common/list";
import NewCourse from "./new-course";
import Course from "./course";
import PreloadList from "src/components/common/card/preload/List";
import './section.scss';

export default function CoursesSection() {
    const { courses, isLoading, search } = useCoursesContext();
    const { user } = useUserContext();
    const theresQueries = search.value !== '' || search.selectedFilter !== '';
    const isUserAuthorized = user.role === 'teacher' || user.role === 'admin';
    const showCreateCourse = isUserAuthorized && !theresQueries;

    if(isLoading) return <PreloadList />;

    const elements = courses.map(item => (
        <Course key={item.id} course={item} />
    ))

    return (
        <div className="course-section">
            <List>
                {showCreateCourse && <NewCourse />}
                {elements}
            </List>
        </div>
    )
}