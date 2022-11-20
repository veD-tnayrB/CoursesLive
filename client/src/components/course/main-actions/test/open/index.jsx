import ArticleIcon from '@mui/icons-material/Article';
import { Link } from 'react-router-dom';

export default function OpenTest({ test }) {
	return (
		<Link className="action-button" to={`test/${test}`}>
			<ArticleIcon className="icon" />
		</Link>
	);
}
