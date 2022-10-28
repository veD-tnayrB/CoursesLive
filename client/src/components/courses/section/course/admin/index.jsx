import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
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
                <DeleteIcon className="icon" id="delete" />
            </ActionButton>

            <ActionButton title="Edit" id="edit" className="default-button" onClick={openModals}>
                <CreateIcon className="icon" id="edit" />
            </ActionButton>
        </>
    )
}