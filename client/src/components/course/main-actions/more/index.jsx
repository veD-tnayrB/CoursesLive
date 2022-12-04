import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useCourseContext } from 'src/contexts/course/course.context';
import './more.scss';

export default function More() {
	const { selectedEpisode } = useCourseContext();
	const disabled = selectedEpisode?.itsEmpty;

	return (
		<button disabled={disabled} className="more-button action-button">
			<MoreHorizIcon className="icon" />
		</button>
	);
}
