import uniqid from 'uniqid';
import EpisodePreload from './episode';
import FiltersPreload from './filters';
import './episodes-preload.scss';

const NUMBER_0F_EPISODES = 10;

export default function EpisodesPreload({ showFilters }) {
	const episodesElements = [...Array(NUMBER_0F_EPISODES)].map(() => <EpisodePreload key={uniqid()} />);

	return (
		<section className="episodes-section preload">
			{showFilters && <FiltersPreload />}

			<ul>{episodesElements}</ul>
		</section>
	);
}
