import { useCoursesContext } from "src/contexts/course/course.context";
import ModalContainer from "src/components/common/modal/ModalContainer";
import Modal from "src/components/common/modal";
import EditCourseForm from "./form";

export default function EditCourseModal() {
    const { modals, setModals } = useCoursesContext();

    function onHide() {
        setModals({...modals, register: {...modals.edit, show: false }});
    }

    return (
        <ModalContainer
            className="create-modal" 
            show={modals.edit.show}
        >
            <Modal>
                <button onClick={onHide} className="close-modal-button">x</button>
                <h1 className="title">Welcome to the creation form!</h1>
                <p>
                    This is the course creation window, just by filling this information you will be able to start sharing your content on the platform!
                </p>
                <EditCourseForm />
            </Modal>
        </ModalContainer>
    )
}