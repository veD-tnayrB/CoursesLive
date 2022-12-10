import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { userService } from 'src/services/user';
import { UserContext } from 'src/contexts/user/user.context';
import UserInfo from 'src/components/user/info';
import InfoModifier from 'src/components/user/info-modifier';
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
	const [selectedUser, setSelectedUser] = React.useState(DEFAULT_USER_STATE);
	const [isLoading, setIsLoading] = React.useState(true);
	const { userId } = useParams();
	const navigateTo = useNavigate();

	console.log(1, selectedUser.courses);

	React.useEffect(() => {
		const controller = new AbortController();
		const signal = controller.signal;

		userService
			.getById(signal, userId)
			.then((response) => setSelectedUser(response))
			.catch(() => navigateTo('/404'))
			.finally(() => setIsLoading);

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
				<InfoModifier />
			</div>
		</UserContext.Provider>
	);
}
