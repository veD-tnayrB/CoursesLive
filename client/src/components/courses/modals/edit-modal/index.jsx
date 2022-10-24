import { useCoursesContext } from "src/contexts/courses/courses.context";
import ModalContainer from "src/components/common/modal/ModalContainer";
import Modal from "src/components/common/modal";
import EditCourseForm from "./form";

export default function EditCourseModal() {
    const { modals, setModals } = useCoursesContext();

    return (
        <ModalContainer
            className="create-modal" 
            show={modals.edit.show}
        >
            <Modal
                setModals={setModals}
                modal="edit"
            >
                <h1 className="title">It's time to edit!</h1>
                <p>
                    From here you can edit the information of your courses!
                </p>
                <EditCourseForm />
            </Modal>
        </ModalContainer>
    )
}