import { useCoursesContext } from "src/contexts/courses/courses.context";
import Card from "src/components/common/card";
import './new-course.scss';

export default function NewCourse() {
    const { modals, setModals } = useCoursesContext();

    function showCreateCourseModal() {
        setModals({...modals, create: {...modals.create, show: true}});
    }

    return (
        <Card className="new-course">
            <button
                onClick={showCreateCourseModal} 
                className="create-course-button"
            >
                <span>+</span>
            </button>
        </Card>
    )
}