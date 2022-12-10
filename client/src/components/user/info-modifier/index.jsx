import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import useForm from 'src/hooks/useForm';
import ValidationInput from 'src/components/common/validation-input';
import ProfileDropzone from './profile-dropzone';
import './info-modifier.scss';

const namePattern = /^[A-Z]{1,1}[a-z]+$/;
const lastNamePattern = /^[A-Z]{1,1}[a-z]+$/;
const mailPattern = /^[A-Za-z_0-9]+@[a-z_]+?\.[a-zA-Z]{2,3}$/;
const passwordPattern = /[\w]{8,16}/;

const INITIAL_VALUES = {
	name: { value: '', isCorrect: false, validation: namePattern },
	lastName: { value: '', isCorrect: false, validation: lastNamePattern },
	mail: { value: '', isCorrect: false, validation: mailPattern },
	password: { value: '', isCorrect: false, validation: passwordPattern },
};
const TOTAL_INPUTS = Object.keys(INITIAL_VALUES);

export default function InfoModifier() {
	const { form, handleChanges } = useForm(INITIAL_VALUES);
	const [profileImage, setProfileImage] = React.useState({});
	const navigateTo = useNavigate();

	const correctInputs = Object.keys(form).filter((prop) => form[prop].isCorrect);
	const isInfoCorrect = correctInputs.length === TOTAL_INPUTS.length;

	async function editInformation(event) {
		event.preventDefault();
		const formatedUser = {
			name: form.name.value,
			lastName: form.lastName.value,
			mail: form.mail.value,
			password: form.password.value,
		};

		const isEverythingOk = await signup(formatedUser);
		if (isEverythingOk) navigateTo('/');
	}

	return (
		<section className="info-modifier">
			<form onSubmit={editInformation}>
				<div className="inputs">
					<ProfileDropzone profile={profileImage} setProfile={setProfileImage} />

					<div className="first-row">
						<ValidationInput type="text" name="name" value={form.name.value} onChange={handleChanges} placeholder="Name" autoComplete="off" isCorrect={form.name.isCorrect} />
						<ValidationInput type="text" name="lastName" value={form.lastName.value} onChange={handleChanges} placeholder="Last Name" autoComplete="off" isCorrect={form.lastName.isCorrect} />
					</div>

					<ValidationInput type="text" name="mail" value={form.mail.value} onChange={handleChanges} placeholder="Mail" autoComplete="off" isCorrect={form.mail.isCorrect} />
					<ValidationInput type="password" name="password" value={form.password.value} onChange={handleChanges} placeholder="Password" autoComplete="off" isCorrect={form.password.isCorrect} />
				</div>

				<div className="actions-container">
					<button disabled={!isInfoCorrect} className="primary-button">
						Save changes
					</button>
				</div>
			</form>
		</section>
	);
}
