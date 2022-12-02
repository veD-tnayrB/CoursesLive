import uniqid from 'uniqid';
import EpisodePreload from './episode';

const NUMBER_0F_EPISODES = 10;

export default function EpisodesPreload() {
	const episodesElements = [...Array(NUMBER_0F_EPISODES)].map(() => <EpisodePreload key={uniqid()} />);

	return (
		<section className="episodes-section">
			<ul className="filters">
				<li className="filter">
					<button>All</button>
				</li>
				<li className="filter">
					<button>Last</button>
				</li>
				<li className="filter">
					<button>Viewed</button>
				</li>
			</ul>

			<ul>{episodesElements}</ul>
		</section>
	);
}
