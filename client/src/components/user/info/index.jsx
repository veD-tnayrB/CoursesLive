import * as React from 'react';
import { useUserContext } from 'src/contexts/user/user.context';
import { IMAGES_ROUTES } from 'src/services/config';
import Input from './input';
import useForm from 'src/hooks/useForm';
import './info.scss';

const COLORS_BY_ROLE = {
	student: 'blue',
	teacher: 'green',
	admin: 'red',
};

const namePattern = /^[A-Z]{1,1}[a-z]+$/;
const lastNamePattern = /^[A-Z]{1,1}[a-z]+$/;
const mailPattern = /^[A-Za-z_0-9]+@[a-z_]+?\.[a-zA-Z]{2,3}$/;

const INITIAL_VALUES = {
	name: { value: '', isCorrect: false, validation: namePattern },
	lastName: { value: '', isCorrect: false, validation: lastNamePattern },
	mail: { value: '', isCorrect: true, validation: mailPattern },
};

export default function UserInfo() {
	const { selectedUser } = useUserContext();
	const { form, handleChanges } = useForm(INITIAL_VALUES);
	const profileImg = `${IMAGES_ROUTES}${selectedUser.profileImage}`;
	const userNames = `${selectedUser.name} ${selectedUser.lastName}`;

	const roleColor = COLORS_BY_ROLE[selectedUser.role];

	return (
		<section className="user-info">
			<img src={profileImg} alt={userNames} />

			<div className="detailed-information">
				<Input name="name" value={form.name.value || selectedUser.name} isCorrect={form.name.isCorrect} onChange={handleChanges} placeholder="Insert the new name" />
				<Input name="lastName" value={form.lastName.value || selectedUser.lastName} isCorrect={form.lastName.isCorrect} onChange={handleChanges} placeholder="Insert the new last name" />
				<Input name="mail" value={form.mail.value || selectedUser.mail} isCorrect={form.mail.isCorrect} onChange={handleChanges} placeholder="Insert the new email" />
				<p className={`role ${roleColor}`}>{selectedUser.role}</p>
			</div>
		</section>
	);
}
