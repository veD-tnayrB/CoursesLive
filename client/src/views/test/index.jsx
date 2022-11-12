import { useCourseContext } from 'src/contexts/course/course.context';
import ModalContainer from 'src/components/common/modal/ModalContainer';
import Modal from 'src/components/common/modal';

export default function Test() {
	const { selectedEpisode } = useCourseContext();
	console.log(selectedEpisode);

	return (
		<div className="test-page">
			<ModalContainer show>
				<Modal close={false}>CUCHA PICHA</Modal>
			</ModalContainer>
		</div>
	);
}
