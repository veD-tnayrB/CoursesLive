import { Navigate } from 'react-router-dom';
import { useAuthContext } from 'src/contexts/auth/auth.context';
import LoginHeader from 'src/components/login/header';
import Modal from 'src/components/common/modal';
import LoginForm from 'src/components/login/form';
import './login.scss';

export default function Login() {
	const { isUserLogged } = useAuthContext();
	if (isUserLogged) return <Navigate to="/" />;

	return (
		<div className="login-page">
			<Modal close={false}>
				<LoginHeader />
				<LoginForm />
			</Modal>
		</div>
	);
}
