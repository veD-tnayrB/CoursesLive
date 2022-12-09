import { useAuthContext } from 'src/contexts/auth/auth.context';
import { NavLink } from 'react-router-dom';
import { ROUTES } from './defined-routes';

function Routes() {
	const { user } = useAuthContext();

	const routesElements = ROUTES.map((element) => {
		if (element.requireAdmin && user.role !== 'admin') return;

		return (
			<NavLink key={element.route} className="nav-route" to={element.route}>
				{element.name}
			</NavLink>
		);
	});

	return <ul className="routes-list">{routesElements}</ul>;
}

export default Routes;
