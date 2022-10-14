import { useCoursesContext } from "src/contexts/course/course.context";
import { removeCourse } from 'src/services/courses';
import ModalContainer from "src/components/common/modal/ModalContainer";
import Modal from 'src/components/common/modal';
import ActionButton from "src/components/common/action-button";
import './delete-modal.scss';

export default function DeleteCourseModal() {
    const { setCourses, modals, setModals } = useCoursesContext();
    const { courseId } = modals.delete.payload;

    function remove({ setIsLoading }) {
        setIsLoading(true);

        removeCourse(courseId)
        .then(response => {
            setCourses(courses => (courses.filter(course => course.id !== courseId)));
            setIsLoading(false);
            onHide();
        });
    }

    function onHide() {
        setModals({...modals, delete: {...modals.delete, show: false}});
    }

    return (
        <ModalContainer
            className="delete-modal" 
            show={modals.delete.show}
        >
            <Modal>
                <button onClick={onHide} className="close-modal-button">x</button>
                <h1 className="title">Are you sure?</h1>
                <p>
                    When you delete a course you lose all the information about it, episodes, subscribers and all other information related to it, this action is irreversible.
                </p>
                <div className="actions-container">
                    <button onClick={onHide} className="secondary-button">
                        Cancel
                    </button>

                    <ActionButton onClick={remove} className="primary-button">
                        Yes, delete
                    </ActionButton>
                </div>
            </Modal>
        </ModalContainer>
    )
}