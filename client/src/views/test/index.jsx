import { useCourseContext } from 'src/contexts/course/course.context';
import ModalContainer from 'src/components/common/modal/ModalContainer';
import Modal from 'src/components/common/modal';
import TestHeader from 'src/components/test/header';

export default function Test() {
	const { selectedEpisode } = useCourseContext();
	console.log(selectedEpisode);

	return (
		<div className="test-page">
			<ModalContainer show>
				<Modal close={false}>
					<TestHeader />
				</Modal>
			</ModalContainer>
		</div>
	);
}
