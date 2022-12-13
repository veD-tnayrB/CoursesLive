import * as React from 'react';
import { userService } from 'src/services/user';
import { useUsersContext } from 'src/contexts/users/users.context';
import Modal from 'src/components/common/modal';
import ModalContainer from 'src/components/common/modal/ModalContainer';
import ActionButton from 'src/components/common/action-button';
import Roles from './roles';
import './edit-modal.scss';

export default function EditUsersModal() {
	const { modals, setModals, setUsers, users } = useUsersContext();
	const { userId, user } = modals.edit.payload;
	const [selectedRole, setSelectedRole] = React.useState(user?.role ?? 'student');

	function changeRank({ setIsLoading }) {
		setIsLoading(true);
		userService.changeUserRank(userId, selectedRole).then((response) => {
			setIsLoading(false);
			setUsers((prevUsers) =>
				prevUsers.map((user) => {
					if (user.id === userId) return response;
					return user;
				})
			);

			setModals((otherModals) => ({ ...otherModals, edit: { ...otherModals.edit, show: false } }));
		});
	}

	return (
		<ModalContainer className="edit-modal" show={modals.edit.show}>
			<Modal setModals={setModals} modal="edit">
				<h1 className="title">Welcome to the user role editing window!</h1>
				<p className="message">Here you can modify the role of the selected user by limiting it or making new tools available on the platform.</p>

				<Roles selectedRole={selectedRole} setSelectedRole={setSelectedRole} />

				<div className="actions-container">
					<ActionButton className="primary-button" onClick={changeRank}>
						Update
					</ActionButton>
				</div>
			</Modal>
		</ModalContainer>
	);
}
