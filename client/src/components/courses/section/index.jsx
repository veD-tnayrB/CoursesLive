import { useCoursesContext } from "src/contexts/course/course.context";
import List from "src/components/common/list";
import NewCourse from "../new-course";
import Course from "../course";
import PreloadList from "src/components/common/card/preload/List";
import './section.scss';

export default function CoursesSection() {
    const { courses, isLoading, search } = useCoursesContext();
    const theresQueries = search.value !== '' || search.selectedFilter !== '';

    if(isLoading) return <PreloadList />;

    const elements = courses.map(item => (
        <Course key={item.id} course={item} />
    ))

    return (
        <div className="course-section">
            <List>
                {!theresQueries && <NewCourse />}
                {elements}
            </List>
        </div>
    )
}