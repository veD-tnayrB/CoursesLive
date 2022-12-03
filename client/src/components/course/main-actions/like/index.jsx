import * as React from 'react';
import { useParams } from 'react-router-dom';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { useUserContext } from 'src/contexts/user/user.context';
import { useCourseContext } from 'src/contexts/course/course.context';
import { episodeService } from 'src/services/episodes';

export default function Like() {
	const { courseId, episodeId } = useParams();
	const { user } = useUserContext();
	const { selectedEpisode, setSelectedEpisode, isUserSuscribed, course } = useCourseContext();
	const itsLikeIt = selectedEpisode.peopleWhoLikedIt.some((person) => person === user.id);
	const numberOfLikes = selectedEpisode.peopleWhoLikedIt.length;
	const disabled = !isUserSuscribed || course.episodes.length === 0;
	const cls = disabled ? 'disabled' : '';

	const Icon = itsLikeIt ? ThumbUpAltIcon : ThumbUpOffAltIcon;

	function handleLike() {
		setSelectedEpisode((otherValues) => ({
			...otherValues,
			peopleWhoLikedIt: [...otherValues.peopleWhoLikedIt, user.id],
		}));
		episodeService.like(courseId, episodeId);
	}

	function handleUnlike() {
		setSelectedEpisode((otherValues) => ({
			...otherValues,
			peopleWhoLikedIt: otherValues.peopleWhoLikedIt.filter((person) => person !== user.id),
		}));
		episodeService.unlike(courseId, episodeId);
	}

	function toggleLike() {
		if (disabled) return;

		if (!itsLikeIt) return handleLike();
		handleUnlike();
	}

	return (
		<div className={`action-button ${cls}`}>
			<button onClick={toggleLike} disabled={disabled}>
				<Icon className="icon" />
			</button>

			<span>{numberOfLikes} Likes</span>
		</div>
	);
}
