import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from 'src/contexts/auth/auth.context';
import { IMAGES_ROUTES } from 'src/services/config';
import { episodeService } from 'src/services/episodes';
import { useCommentsContext } from './context';
import useForm from 'src/hooks/useForm';
import { useEpisodeContext } from 'src/contexts/episode/episode.context';

export default function NewComment() {
	const { setComments } = useCommentsContext();
	const { isUserSuscribed, isCourseCreator, selectedEpisode } = useEpisodeContext();
	const { form, handleChange, setFormValues } = useForm({ comment: '' });
	const { user, isUserLogged } = useAuthContext();
	const { episodeId } = useParams();
	const disabled = (!isCourseCreator && !isUserSuscribed) || selectedEpisode?.itsEmpty;
	const cls = disabled ? 'disabled' : '';

	const userImgSrc = isUserLogged ? `${IMAGES_ROUTES}${user.profileImage}` : '/src/assets/user/default-user.svg';

	function handleSubmit(event) {
		event.preventDefault();
		if (form.comment === '' || disabled) return;

		setFormValues({ comment: '' });
		const creator = { id: user.id, name: user.name, lastName: user.lastName, profileImage: user.profileImage };
		episodeService.createComment(episodeId, { content: form }).then((response) => setComments((prevValues) => [{ ...response, creator }, ...prevValues]));
	}

	return (
		<article className={`new-comment ${cls}`}>
			<header className="comment-user">
				<img src={userImgSrc} />
				<h3 className="creator">
					{user.name} {user.lastName}
				</h3>
			</header>

			<form onSubmit={handleSubmit}>
				<textarea placeholder="Insert a comment..." onChange={handleChange} value={form.comment} disabled={disabled} />
				<button className={`default-button ${cls}`} disabled={disabled}>
					SEND
				</button>
			</form>
		</article>
	);
}
