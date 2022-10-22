import { useCoursesContext } from "src/contexts/courses/courses.context";
import ActionButton from "src/components/common/action-button";

export default function CourseAdminActions({ course }) {
    const { modals, setModals } = useCoursesContext();

    function openModals({ event }) {
        const { id: name } = event.currentTarget;
        setModals({...modals, [name]: { show: true, payload: { courseId: course.id, course } }});
    }

    return (
        <>
            <ActionButton title="Delete" id="delete" className="default-button" onClick={openModals}>
                <img
                    id="delete"
                    src="src/assets/icons/trash.svg"
                    alt=""
                    className="icon"
                />
            </ActionButton>

            <ActionButton title="Edit" id="edit" className="default-button" onClick={openModals}>
                <img
                    id="edit"
                    src="src/assets/icons/edit.svg"
                    alt=""
                    className="icon"
                />
            </ActionButton>
        </>
    )
}