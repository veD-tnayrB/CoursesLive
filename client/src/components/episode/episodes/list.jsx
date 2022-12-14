import NoContentMessage from 'src/components/common/messages/no-content';
import { useAuthContext } from 'src/contexts/auth/auth.context';
import EpisodesPreload from '../preloads/episodes';
import { useEpisodesContext } from './context';
import Episode from './episode';
import NewEpisode from './new-episode';

export default function EpisodesList() {
	const { isLoading, episodes } = useEpisodesContext();
	const { user } = useAuthContext();
	const canCreateEpisodes = user.role === 'admin' || user.role === 'teacher';
	const theresNoResults = episodes.length === 0;

	const episodesElements = episodes.map((episode) => <Episode key={episode.id} episode={episode} />);
	const list = !isLoading ? episodesElements : <EpisodesPreload />;

	const Content = () => (
		<ul>
			{canCreateEpisodes && <NewEpisode />}
			{list}
		</ul>
	);

	return <>{theresNoResults ? <NoContentMessage text="This course has no content at this time" /> : <Content />}</>;
}
