import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useEpisodeContext } from 'src/contexts/episode/episode.context';
import './more.scss';

export default function More() {
	const { selectedEpisode } = useEpisodeContext();
	const disabled = selectedEpisode?.itsEmpty;

	return (
		<button disabled={disabled} className="more-button action-button">
			<MoreHorizIcon className="icon" />
		</button>
	);
}
