import ArticleIcon from '@mui/icons-material/Article';
import { Link } from 'react-router-dom';

export default function OpenTest({ test }) {
	const to = test?.id ? `test/${test.id}` : `test/${test}`;

	return (
		<Link className="action-button" to={to}>
			<ArticleIcon className="icon" />
		</Link>
	);
}
