import * as React from 'react';
import { useParams } from 'react-router-dom';
import { userService } from 'src/services/user';

export default function User() {
	const [selectedUser, setSelectedUser] = React.useState({});
	const { userId } = useParams();
	console.log(userId);
	React.useEffect(() => {
		const controller = new AbortController();
		const signal = controller.signal;

		userService.getById(signal, userId).then((response) => console.log(response));

		return () => controller.abort();
	}, []);

	return <div className="page"></div>;
}
