import { Link } from 'react-router-dom';
import ModalContainer from 'src/components/common/modal/ModalContainer';
import Modal from 'src/components/common/modal';
import './register-modal.scss';

export default function RegisterModal({ modals, setModals, title = '' }) {
	return (
		<ModalContainer className="register-modal" show={modals.register.show}>
			<Modal setModals={setModals} modal="register">
				<h1 className="title">{title}</h1>
				<p className="message">To be able to access any of our courses you need an account, this will also give you access to any of the episodes of any course in addition to having at your disposal any of our performance tests!</p>
				<p className="message secondary-message">
					If you already have an account you can
					<Link className="login-link" to="/login">
						{' '}
						Log in!
					</Link>
				</p>

				<div className="actions-container">
					<Link className="default-button" to="/signup">
						Register
					</Link>
				</div>
			</Modal>
		</ModalContainer>
	);
}
