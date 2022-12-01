import uniqid from 'uniqid';
import { useUserContext } from 'src/contexts/user/user.context';
import EpisodePreload from './episode';

const NUMBER_0F_EPISODES = 10;

export default function EpisodesPreload() {
	const { user } = useUserContext();
	const canCreateEpisodes = user.role === 'admin' || user.role === 'teacher';
	const episodesElements = [...Array(NUMBER_0F_EPISODES)].map(() => <EpisodePreload key={uniqid()} />);

	return (
		<section className="episodes-section">
			<ul className="filters">
				<li className="filter">All</li>
				<li className="filter">Last</li>
				<li className="filter">Viewed</li>
			</ul>

			<ul>{episodesElements}</ul>
		</section>
	);
}
