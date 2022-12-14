import ArticleIcon from '@mui/icons-material/Article';
import { useEpisodeContext } from 'src/contexts/episode/episode.context';
import { Link } from 'react-router-dom';

export default function OpenTest({ test, episodeHasTest }) {
	const { isUserSuscribed } = useEpisodeContext();
	const disabled = !isUserSuscribed || !episodeHasTest;
	const cls = disabled ? 'disabled' : '';

	const to = !disabled ? (test?.id ? `test/${test.id}` : `test/${test}`) : '';

	return (
		<Link className={`action-button ${cls}`} to={to}>
			<ArticleIcon className="icon" />
		</Link>
	);
}
