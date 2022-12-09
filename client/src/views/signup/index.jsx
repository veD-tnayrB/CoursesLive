import { Navigate } from 'react-router-dom';
import { useAuthContext } from 'src/contexts/auth/auth.context';
import SignupHeader from 'src/components/signup/header';
import SignupForm from 'src/components/signup/form';
import Modal from 'src/components/common/modal';
import './signup.scss';

export default function Signup() {
	const { isUserLogged } = useAuthContext();
	if (isUserLogged) return <Navigate to="/" />;

	return (
		<div className="sign-up-page">
			<Modal close={false}>
				<SignupHeader />
				<SignupForm />
			</Modal>
		</div>
	);
}
