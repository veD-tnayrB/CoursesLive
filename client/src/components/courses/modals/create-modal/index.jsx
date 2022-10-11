import { useCoursesContext } from "src/contexts/course/course.context";
import ModalContainer from "src/components/common/modal/ModalContainer";
import Modal from 'src/components/common/modal';
import CreateCourseForm from './form';

export default function CreateModal() {
    const { modals, setModals } = useCoursesContext();

    function onHide() {
        setModals({...modals, create: false});
    }

    return (
        <ModalContainer
            className="register-modal" 
            show={modals.create}
        >
            <Modal>
                <button onClick={onHide} className="close-modal-button">x</button>
                <h1 className="title">Welcome to the creation form!</h1>
                <CreateCourseForm />
            </Modal>
        </ModalContainer>
    )
}