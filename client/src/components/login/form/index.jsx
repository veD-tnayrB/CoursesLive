import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from 'src/contexts/auth/auth.context';
import ValidationInput from 'src/components/common/form/validation-input';
import useForm from 'src/hooks/useForm';
import './form.scss';

const mailPattern = /^[A-Za-z_0-9]+@[a-z_]+?\.[a-zA-Z]{2,3}$/;
const passwordPattern = /[\w]{8,16}/;

const INITIAL_VALUES = {
	mail: { value: '', isCorrect: false, validation: mailPattern },
	password: { value: '', isCorrect: false, validation: passwordPattern },
};

const TOTAL_INPUTS = Object.keys(INITIAL_VALUES);

export default function LoginForm() {
	const { error, login } = useAuthContext();
	const { form, handleChanges } = useForm(INITIAL_VALUES);
	const navigateTo = useNavigate();

	const correctInputs = Object.keys(form).filter((prop) => form[prop].isCorrect);
	const isInfoCorrect = correctInputs.length === TOTAL_INPUTS.length;

	async function handleSubmit(event) {
		event.preventDefault();
		const formatedUser = {
			mail: form.mail.value,
			password: form.password.value,
		};

		const isEverythingOk = await login(formatedUser);
		if (isEverythingOk) navigateTo('/');
	}

	return (
		<form className="login-form" onSubmit={handleSubmit}>
			<div className="inputs-container">
				<ValidationInput type="text" name="mail" value={form.mail.value} onChange={handleChanges} placeholder="Mail" autoComplete="off" isCorrect={form.mail.isCorrect} />

				<ValidationInput type="password" name="password" value={form.password.value} onChange={handleChanges} placeholder="Password" autoComplete="off" isCorrect={form.password.isCorrect} />
			</div>

			<div className="errors-container">
				<p className="errors">{error}</p>
			</div>

			<div className="actions-container">
				<Link to="/signup">Register</Link>

				<button disabled={!isInfoCorrect} className="primary-button">
					Login
				</button>
			</div>
		</form>
	);
}
