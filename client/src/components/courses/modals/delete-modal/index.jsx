import { useCoursesContext } from "src/contexts/courses/courses.context";
import { removeCourse } from 'src/services/courses';
import DeleteModal from "src/components/common/modals/delete-modal";


export default function DeleteCourseModal() {
    const { setCourses, modals, setModals } = useCoursesContext();
    const { courseId } = modals.delete.payload;
    
    function remove({ setIsLoading }) {
        setIsLoading(true);

        removeCourse(courseId)
        .then(() => {
            setCourses(courses => (courses.filter(course => course.id !== courseId)));
            setIsLoading(false);
            setModals(otherModals => ({...otherModals, delete: {...otherModals.delete, show: false }}));
        });
    }

    return (
        <DeleteModal 
            modals={modals}
            setModals={setModals}
            description="When you delete a course you lose all the information about it, episodes, subscribers and all other information related to it, this action is irreversible."
            remove={remove}
        />
    )
}