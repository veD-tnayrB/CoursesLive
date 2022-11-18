import ActionButton from 'src/components/common/action-button';
import { useCourseContext } from 'src/contexts/course/course.context';

export default function CreationModalActions({ isInfoCorrect }) {
	const { setModals } = useCourseContext();

	function back() {
		setModals((othersModals) => ({ ...othersModals, edit: { ...othersModals.edit, show: false } }));
	}

	return (
		<div className="actions-container">
			<button onClick={back} type="reset" className="secondary-button">
				Back
			</button>

			<ActionButton className="primary-button" disabled={!isInfoCorrect}>
				Create
			</ActionButton>
		</div>
	);
}
