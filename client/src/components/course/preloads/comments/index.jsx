import uniqid from 'uniqid';
import CommentPreload from './comment';

const NUMBER_OF_COMMENTS = 10;

export default function CommentsPreload() {
	const commentsElements = [...Array(NUMBER_OF_COMMENTS)].map((comment) => <CommentPreload key={uniqid()} />);

	return (
		<section className="comments-section">
			<ul className="comments">{commentsElements}</ul>
		</section>
	);
}
