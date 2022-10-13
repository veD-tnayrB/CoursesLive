import { useCoursesContext } from "src/contexts/course/course.context";
import ModalContainer from "src/components/common/modal/ModalContainer";
import Modal from 'src/components/common/modal';
import CreateCourseForm from './form';
import './create-modal.scss';

export default function CreateModal() {
    const { modals, setModals } = useCoursesContext();

    function onHide() {
        setModals({...modals, create: false});
    }

    return (
        <ModalContainer
            className="create-modal" 
            show={modals.create}
        >
            <Modal>
                <button onClick={onHide} className="close-modal-button">x</button>
                <h1 className="title">Welcome to the creation form!</h1>
                <p>
                    This is the course creation window, just by filling this information you will be able to start sharing your content on the platform!
                </p>
                <CreateCourseForm />
            </Modal>
        </ModalContainer>
    )
}