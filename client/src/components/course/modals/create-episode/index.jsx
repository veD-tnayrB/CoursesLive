import { useCourseContext } from 'src/contexts/course/course.context';
import ModalContainer from 'src/components/common/modal/ModalContainer';
import Modal from 'src/components/common/modal';
import CreateEpisodeForm from './form';

export default function CreateEpisodeModal() {
    const { modals, setModals } = useCourseContext();


    return (
        <ModalContainer show={modals.createEpisode.show}>

            <Modal 
                setModals={setModals}
                modal="createEpisode" 
            >
                <CreateEpisodeForm />
            </Modal>
        </ModalContainer>
    )
}