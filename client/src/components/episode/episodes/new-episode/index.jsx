import Card from 'src/components/common/card';
import AddIcon from '@mui/icons-material/Add';
import { useEpisodeContext } from 'src/contexts/episode/episode.context';
import './new-episode.scss';

export default function NewEpisode() {
	const { setModals } = useEpisodeContext();

	function showCreateEpisodeModal() {
		setModals((otherModals) => ({ ...otherModals, create: { ...otherModals.createEpisode, show: true } }));
	}

	return (
		<Card className="new-episode">
			<button onClick={showCreateEpisodeModal} className="create-episode-button">
				<AddIcon className="icon" />
			</button>
		</Card>
	);
}
