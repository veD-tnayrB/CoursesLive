import * as React from 'react';
import { useUsersContext } from 'src/contexts/users/users.context';
import PreloadList from 'src/components/common/card/preload/list';
import ErrorMessage from 'src/components/common/messages/error';
import List from 'src/components/common/list';
import User from './user';
import './section.scss';

export default function UserSection() {
	const { isLoading, users } = useUsersContext();

	if (isLoading) return <PreloadList />;
	if (!users) return <ErrorMessage message="Oops, looks like theres no results avaiable" />;

	const userElements = users.map((user) => <User key={user.id} user={user} />);

	return (
		<div className="users-section">
			<List>{userElements}</List>
		</div>
	);
}
