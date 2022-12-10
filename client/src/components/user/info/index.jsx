import { useUserContext } from 'src/contexts/user/user.context';
import { IMAGES_ROUTES } from 'src/services/config';
import './info.scss';

const COLORS_BY_ROLE = {
	student: 'blue',
	teacher: 'green',
	admin: 'red',
};

export default function UserInfo() {
	const { selectedUser } = useUserContext();
	const profileImg = `${IMAGES_ROUTES}${selectedUser.profileImage}`;
	const userNames = `${selectedUser.name} ${selectedUser.lastName}`;

	const roleColor = COLORS_BY_ROLE[selectedUser.role];

	return (
		<section className="user-info">
			<img src={profileImg} alt={userNames} />

			<div className="detailed-information">
				<h2 className="names">{userNames}</h2>
				<h3 className="mail">{selectedUser.mail}</h3>
				<p className={`role ${roleColor}`}>{selectedUser.role}</p>
			</div>
		</section>
	);
}
