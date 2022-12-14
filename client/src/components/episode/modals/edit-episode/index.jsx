import { useEpisodeContext } from 'src/contexts/episode/episode.context';
import Modal from 'src/components/common/modal';
import ModalContainer from 'src/components/common/modal/ModalContainer';
import EditEpisopdeForm from './form';
import EditEpisodeHeader from './header';
import './edit-episode.scss';

export default function EditEpisodeModal() {
	const { modals, setModals } = useEpisodeContext();

	return (
		<ModalContainer className="edit-episode-modal" show={modals.edit.show}>
			<Modal setModals={setModals} modal="edit">
				<EditEpisodeHeader />
				<EditEpisopdeForm />
			</Modal>
		</ModalContainer>
	);
}
