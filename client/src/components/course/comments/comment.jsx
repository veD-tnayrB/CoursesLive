import * as React from 'react';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IMAGES_ROUTES } from 'src/services/config';
import Tools from './tools';
import EditComment from './edit-comment';
import { useUserContext } from 'src/contexts/user/user.context';

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en-US');

export default function EpisodeComment({ comment }) {
	const [showTools, setShowTools] = React.useState(false);
	const [inEdition, setInEdition] = React.useState(false);
	const { user } = useUserContext();
	const formatedDate = timeAgo.format(new Date(comment.date).getTime());
	const hasPermitions = user.id === comment.creator.id;

	function showToolsTab() {
		setShowTools((prevValue) => !prevValue);
	}

	if (inEdition) return <EditComment setInEdition={setInEdition} prevComment={comment} />;

	return (
		<li className="comment">
			<article>
				<header>
					<img src={`${IMAGES_ROUTES}${comment.creator.profileImage}`} />
					<h3 className="creator">
						{comment.creator.name} {comment.creator.lastName}
					</h3>{' '}
					- <span className="time-ago">{formatedDate}</span>
				</header>
				<p className="content">{comment.content}</p>
				<div className="actions">
					{hasPermitions && (
						<button onClick={showToolsTab} className="show-tools-button">
							<MoreVertIcon className="icon" />
						</button>
					)}
					{showTools && <Tools setInEdition={setInEdition} commentId={comment.id} />}
				</div>
			</article>
		</li>
	);
}
