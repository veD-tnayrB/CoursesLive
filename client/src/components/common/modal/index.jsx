import CloseIcon from '@mui/icons-material/Close';
import './modal.scss';

export default function Modal({ children, setModals, modal = '', close = true }) {
	function onHide() {
		setModals((otherModals) => ({ ...otherModals, [modal]: { ...otherModals[modal], show: false } }));
	}

	return (
		<section className="modal">
			{close && (
				<button onClick={onHide} className="close-modal-button">
					<CloseIcon />
				</button>
			)}
			{children}
		</section>
	);
}
