import { useParams, Link } from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear';

export default function TestBackButton() {
	const { courseId, episodeId } = useParams();
	const backUrl = `/courses/course/${courseId}/episode/${episodeId}`;

	return (
		<Link to={backUrl}>
			<ClearIcon className="icon" />
		</Link>
	);
}
