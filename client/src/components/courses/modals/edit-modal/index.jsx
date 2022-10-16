import { useCoursesContext } from "src/contexts/course/course.context";
import ModalContainer from "src/components/common/modal/ModalContainer";
import Modal from "src/components/common/modal";
import EditCourseForm from "./form";

export default function EditCourseModal() {
    const { modals, setModals } = useCoursesContext();

    function onHide() {
        setModals({...modals, edit: {...modals.edit, show: false }});
    }

    return (
        <ModalContainer
            className="create-modal" 
            show={modals.edit.show}
        >
            <Modal>
                <button onClick={onHide} className="close-modal-button">x</button>
                <h1 className="title">It's time to edit!</h1>
                <p>
                    From here you can edit the information of your courses!
                </p>
                <EditCourseForm />
            </Modal>
        </ModalContainer>
    )
}