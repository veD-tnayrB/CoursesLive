import { useUserContext } from 'src/contexts/user/user.context';
import NewEpisode from 'src/components/course/episodes/new-episode';
import EpisodePreload from './episode';

const NUMBER_0F_EPISODES = 10;

export default function EpisodesPreload() {
	const { user } = useUserContext();
	const canCreateEpisodes = user.role === 'admin' || user.role === 'teacher';
	const episodesElements = [...Array(NUMBER_0F_EPISODES)].map((episode) => <EpisodePreload key={episode} />);

	return (
		<section className="episodes-section">
			<ul className="filters">
				<li className="filter">All</li>
				<li className="filter">Last</li>
				<li className="filter">Viewed</li>
			</ul>

			<ul>
				{canCreateEpisodes && <NewEpisode />}
				{episodesElements}
			</ul>
			<CreateEpisodeModal />
		</section>
	);
}
