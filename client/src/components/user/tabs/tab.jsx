import { NavLink } from 'react-router-dom';

export default function Tab({ label, to }) {
	return (
		<li>
			<div className="tab">
				<NavLink to={to}>{label}</NavLink>
			</div>
		</li>
	);
}
