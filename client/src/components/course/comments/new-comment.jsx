import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useUserContext } from 'src/contexts/user/user.context';
import { IMAGES_ROUTES } from 'src/services/config';
import { episodeService } from 'src/services/episodes';
import { useCommentsContext } from './context';
import useForm from 'src/hooks/useForm';

export default function NewComment() {
	const { setComments } = useCommentsContext();
	const { form, handleChange, setFormValues } = useForm({ comment: '' });
	const { user } = useUserContext();
	const { episodeId } = useParams();

	function handleSubmit(event) {
		event.preventDefault();
		if (form.comment === '') return;

		setFormValues({ comment: '' });
		const creator = { id: user.id, name: user.name, lastName: user.lastName, profileImage: user.profileImage };

		episodeService.createComment(episodeId, { content: form }).then((response) => setComments((prevValues) => [{ ...response, creator }, ...prevValues]));
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
				<button className="default-button">SEND</button>
			</form>
		</article>
	);
}