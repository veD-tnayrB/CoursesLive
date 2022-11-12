import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useCourseContext } from 'src/contexts/course/course.context';
import './admin.scss';

export default function AdminEpisodesActions() {
	const { setModals } = useCourseContext();

	function showModal(event) {
		const { id: action } = event.currentTarget;
		setModals((otherModals) => ({ ...otherModals, [action]: { ...otherModals[action], show: true } }));
	}

	return (
		<div className="main-episodes-actions">
			<button className="action-button" onClick={showModal} id="edit" title="Edit episode">
				<EditIcon className="icon" />
			</button>
			<button className="action-button" onClick={showModal} id="delete" title="Delete episode">
				<DeleteIcon className="icon" />
			</button>
		</div>
	);
}
