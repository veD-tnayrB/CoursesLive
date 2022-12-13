import Tab from './tab';
import './tabs.scss';

const tabs = [
	{ label: 'Courses', to: 'courses' },
	{ label: 'Settings', to: 'settings' },
];

export default function Tabs() {
	const tabsElements = tabs.map((tab) => <Tab key={tab.label} label={tab.label} to={tab.to} />);

	return (
		<nav className="tabs">
			<ul>{tabsElements}</ul>
		</nav>
	);
}
