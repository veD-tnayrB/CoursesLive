import { useCourseContext } from 'src/contexts/course/course.context';
import Modal from 'src/components/common/modal';
import ModalContainer from 'src/components/common/modal/ModalContainer';
import CreateTestForm from './form';
import CreateTestHeader from './header';
import './create-test.scss';

export default function CreateTestModal() {
	const { setModals, modals } = useCourseContext();

	return (
		<ModalContainer show={modals.createTest.show}>
			<div className="create-test">
				<Modal setModals={setModals} modal="createTest">
					<CreateTestHeader />
					<CreateTestForm />
				</Modal>
			</div>
		</ModalContainer>
	);
}
