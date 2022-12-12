import { useAuthContext } from 'src/contexts/auth/auth.context';
import { Link, useNavigate } from 'react-router-dom';
import Card from 'src/components/common/card';

export default function UserConfigTab() {
	const { user, logout } = useAuthContext();
	const navigateTo = useNavigate();

	function handleLogout() {
		logout();
		navigateTo('/');
	}

	return (
		<Card>
			<ul className="options-list">
				<li>
					<Link to={`/user/${user.id}`}>
						<button>Settings</button>
					</Link>
				</li>
				<li>
					<button onClick={handleLogout}>Logout</button>
				</li>
			</ul>
		</Card>
	);
}
