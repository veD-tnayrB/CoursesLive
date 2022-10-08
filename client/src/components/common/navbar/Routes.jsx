import { useUserContext } from 'src/contexts/user/user.context';
import { NavLink } from 'react-router-dom';
import { ROUTES } from './defined-routes';

function Routes() {
    const { user } = useUserContext();

    const routesElements = ROUTES.map(element => {
        if (element.requireAdmin && user.role !== 'admin') return;

        return (
            <NavLink 
                key={element.route}
                className="nav-route" 
                to={element.route}
            >
                {element.name}
            </NavLink>
        )
    })

    return (
        <ul className="routes-list">
            {routesElements}
        </ul>
    )
}

export default Routes;