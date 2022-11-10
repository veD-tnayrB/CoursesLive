import * as React from 'react';
import { useParams } from 'react-router-dom';
import { editComment } from 'src/services/episodes';
import { useUserContext } from 'src/contexts/user/user.context';
import { IMAGES_ROUTES } from 'src/services/config';
import { useCommentsContext } from './context';
import useForm from 'src/hooks/useForm';

export default function EditComment({ prevComment, setInEdition }) {
	const { setComments } = useCommentsContext();
	const { form, handleChange, setFormValues } = useForm({ comment: prevComment.content });
	const { user } = useUserContext();
	const { episodeId } = useParams();

	function handleSubmit(event) {
		event.preventDefault();
		if (form.comment === '') return;

		setFormValues({ comment: '' });

		setComments((prevValues) =>
			prevValues.map((comment) => {
				if (comment.id !== prevComment.id) return comment;

				return {
					...comment,
					edited: true,
					content: form,
				};
			})
		);
		setInEdition(false);
		editComment(episodeId, prevComment.id, { content: form });
	}

	return (
		<article className="new-comment">
			<header className="comment-user">
				<img src={`${IMAGES_ROUTES}${user.profileImage}`} />
				<h3 className="creator">
					{user.name} {user.lastName}
				</h3>
			</header>

			<form onSubmit={handleSubmit}>
				<textarea placeholder="Insert a comment..." onChange={handleChange} value={form.comment} />
				<button className="default-button">EDIT</button>
			</form>
		</article>
	);
}
