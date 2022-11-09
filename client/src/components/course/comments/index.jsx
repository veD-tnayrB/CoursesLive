import * as React from 'react';
import { useParams } from 'react-router-dom';
import { getComments } from 'src/services/episodes';
import EpisodeComment from './comment';
import NewComment from './new-comment';
import './comments.scss';
import { CommentsContext } from './context';

export default function EpisodeComments() {
	const [isLoading, setIsLoading] = React.useState(true);
	const [comments, setComments] = React.useState([]);
	const { courseId, episodeId } = useParams();

	React.useEffect(() => {
		const controller = new AbortController();
		const signal = controller.signal;

		setIsLoading(true);

		getComments(signal, episodeId).then((response) => {
			setComments(response);
			setIsLoading(false);
		});

		return () => controller.abort();
	}, [courseId, episodeId]);

	const commentsElements = comments.map((comment) => <EpisodeComment key={comment.id} comment={comment} />);

	const contextValue = {
		comments,
		setComments,
	};
	return (
		<CommentsContext.Provider value={contextValue}>
			<section className="comments-section">
				<NewComment />
				<ul className="comments">{commentsElements}</ul>
			</section>
		</CommentsContext.Provider>
	);
}
