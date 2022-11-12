import ArticleIcon from '@mui/icons-material/Article';
import { Link } from 'react-router-dom';

export default function OpenTest() {
	return (
		<Link className="action-button" to="test">
			<ArticleIcon />
		</Link>
	);
}
