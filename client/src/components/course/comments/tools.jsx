import * as React from 'react';
import { useParams } from 'react-router-dom';
import { removeComment } from 'src/services/episodes';
import { useCommentsContext } from './context';

export default function Tools({ setInEdition, commentId }) {
	const { setComments } = useCommentsContext();
	const { episodeId } = useParams();

	function edit() {
		setInEdition(true);
	}

	function remove() {
		setComments((prevValues) => prevValues.filter((comment) => comment.id !== commentId));
		removeComment(episodeId, commentId);
	}

	return (
		<article className="tools">
			<button onClick={remove}>Remove</button>
			<button onClick={edit}>Edit</button>
		</article>
	);
}
