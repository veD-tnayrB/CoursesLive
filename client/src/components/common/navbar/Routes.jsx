import { NavLink } from 'react-router-dom';
import { ROUTES } from './defined-routes';

function Routes() {

    const routesElements = ROUTES.map(element => (
        <NavLink className="nav-route" to={element.route}>
            {element.name}
        </NavLink>
    ))

    return (
        <ul className="routes-list">
            {routesElements}
        </ul>
    )
}

export default Routes;