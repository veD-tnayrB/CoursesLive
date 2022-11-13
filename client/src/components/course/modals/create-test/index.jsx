import { useCourseContext } from 'src/contexts/course/course.context';
import Modal from 'src/components/common/modal';
import ModalContainer from 'src/components/common/modal/ModalContainer';
import CreateTestForm from './form';
import CreateTestHeader from './header';

export default function CreateTestModal() {
	const { setModals, modals } = useCourseContext();

	return (
		<ModalContainer show={modals.createTest.show}>
			<Modal setModals={setModals} modal="createTest">
				<CreateTestHeader />
				<CreateTestForm />
			</Modal>
		</ModalContainer>
	);
}
