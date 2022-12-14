import uniqid from 'uniqid';
import CommentPreload from './comment';
import './comments-preload.scss';

const NUMBER_OF_COMMENTS = 4;

export default function CommentsPreload() {
	const commentsElements = [...Array(NUMBER_OF_COMMENTS)].map((comment) => <CommentPreload key={uniqid()} />);

	return (
		<section className="comments-section preload">
			<ul className="comments">{commentsElements}</ul>
		</section>
	);
}
