import ArticleIcon from '@mui/icons-material/Article';
import { useCourseContext } from 'src/contexts/course/course.context';
import { Link } from 'react-router-dom';

export default function OpenTest({ test, episodeHasTest }) {
	const { isUserSuscribed } = useCourseContext();
	const disabled = !isUserSuscribed || !episodeHasTest;
	const cls = disabled ? 'disabled' : '';

	const to = !disabled ? (test?.id ? `test/${test.id}` : `test/${test}`) : '';

	return (
		<Link className={`action-button ${cls}`} to={to}>
			<ArticleIcon className="icon" />
		</Link>
	);
}
