import { useEpisodeContext } from 'src/contexts/episode/episode.context';
import LoadingIcon from 'src/components/common/load';
import CreateEpisode from './content';

export default function CreateEpisodeWarning() {
	const { isLoading } = useEpisodeContext();
	const output = isLoading ? <LoadingIcon /> : <CreateEpisode />;

	return <div className="video-error">{output}</div>;
}
