import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useEpisodeContext } from 'src/contexts/episode/episode.context';
import './admin.scss';

export default function AdminEpisodesActions() {
	const { setModals, selectedEpisode } = useEpisodeContext();
	const disabled = selectedEpisode?.itsEmpty;

	function showModal(event) {
		const { id: action } = event.currentTarget;
		setModals((otherModals) => ({ ...otherModals, [action]: { ...otherModals[action], show: true } }));
	}

	return (
		<div className="main-episodes-actions">
			<button disabled={disabled} className="action-button" onClick={showModal} id="edit" title="Edit episode">
				<EditIcon className="icon" />
			</button>
			<button disabled={disabled} className="action-button" onClick={showModal} id="delete" title="Delete episode">
				<DeleteIcon className="icon" />
			</button>
		</div>
	);
}
