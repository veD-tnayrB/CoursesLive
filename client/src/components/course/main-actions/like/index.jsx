import * as React from 'react';
import { useParams } from 'react-router-dom';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { useUserContext } from 'src/contexts/user/user.context';
import { useCourseContext } from 'src/contexts/course/course.context';
import { like, unlike } from 'src/services/episodes';
import './like.scss';

export default function Like() {
	const { courseId, episodeId } = useParams();
	const { user } = useUserContext();
	const { selectedEpisode, setSelectedEpisode } = useCourseContext();
	const itsLikeIt = selectedEpisode.peopleWhoLikedIt.some((person) => person === user.id);
	const numberOfLikes = selectedEpisode.peopleWhoLikedIt.length;

	const Icon = itsLikeIt ? ThumbUpAltIcon : ThumbUpOffAltIcon;

	function handleLike() {
		setSelectedEpisode((otherValues) => ({
			...otherValues,
			peopleWhoLikedIt: [...otherValues.peopleWhoLikedIt, user.id],
		}));
		like(courseId, episodeId);
	}

	function handleUnlike() {
		setSelectedEpisode((otherValues) => ({
			...otherValues,
			peopleWhoLikedIt: otherValues.peopleWhoLikedIt.filter((person) => person !== user.id),
		}));
		unlike(courseId, episodeId);
	}

	function toggleLike() {
		if (!itsLikeIt) return handleLike();
		handleUnlike();
	}

	return (
		<div className="like">
			<button onClick={toggleLike}>
				<Icon className="icon" />
			</button>

			<span>{numberOfLikes} Likes</span>
		</div>
	);
}
