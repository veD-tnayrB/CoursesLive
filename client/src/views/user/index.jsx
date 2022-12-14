import * as React from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from 'src/contexts/auth/auth.context';
import { userService } from 'src/services/user';
import { UserContext } from 'src/contexts/user/user.context';
import UserInfo from 'src/components/user/info';
import './user.scss';

const DEFAULT_USER_STATE = {
	id: '',
	lastName: '',
	mail: '',
	name: '',
	profileImage: '',
	role: '',
	courses: [],
};

export default function User() {
	const { userId } = useParams();
	const { user } = useAuthContext();
	const isUserAllowed = user.role === 'admin' || user.id === userId;
	if (!isUserAllowed) return <Navigate to="/" />;

	const [selectedUser, setSelectedUser] = React.useState(DEFAULT_USER_STATE);
	const [isLoading, setIsLoading] = React.useState(true);
	const navigateTo = useNavigate();

	React.useEffect(() => {
		const controller = new AbortController();
		const signal = controller.signal;

		userService
			.getById(signal, userId)
			.then((response) => setSelectedUser(response))
			.catch(() => navigateTo('/404'))
			.finally(() => setIsLoading(false));

		return () => controller.abort();
	}, []);

	const contextValue = {
		selectedUser,
		setSelectedUser,
		isLoading,
	};
	return (
		<UserContext.Provider value={contextValue}>
			<div className="user-page">
				<UserInfo />
			</div>
		</UserContext.Provider>
	);
}
