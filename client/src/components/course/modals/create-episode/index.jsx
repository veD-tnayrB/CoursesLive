import { useCourseContext } from 'src/contexts/course/course.context';
import ModalContainer from 'src/components/common/modal/ModalContainer';
import Modal from 'src/components/common/modal';
import CreateEpisodeForm from './form';
import CreateEpisodeHeader from './header';

export default function CreateEpisodeModal() {
    const { modals, setModals } = useCourseContext();

    return (
        <ModalContainer className="create-episode-modal" show={modals.create.show}>
            <Modal setModals={setModals} modal="create">
                <CreateEpisodeHeader />
                <CreateEpisodeForm />
            </Modal>
        </ModalContainer>
    );
}
