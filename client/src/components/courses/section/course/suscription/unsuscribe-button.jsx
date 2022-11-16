import * as React from 'react';
import { courseService } from 'src/services/courses';
import ActionButton from 'src/components/common/action-button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useCourseItemContext } from '../context';

export default function UnsuscribeButton({ courseId }) {
	const [isButtonHovered, setIsButtonHovered] = React.useState(false);
	const { setIsSuscribed } = useCourseItemContext();

	function unsuscribe({ isLoading, setIsLoading }) {
		if (isLoading) return;
		setIsLoading(true);
		setIsSuscribed(false);

		courseService
			.unsuscribe(courseId)
			.then(() => {
				setIsLoading(false);
			})
			.catch(() => {
				setIsSuscribed(true);
			});
	}

	function toggleHover() {
		setIsButtonHovered(!isButtonHovered);
	}

	const icon = isButtonHovered ? <FavoriteBorderIcon className="icon" /> : <FavoriteIcon className="icon" />;

	return (
		<ActionButton title="Unsuscribe" className={`suscription default-button ${icon}`} onClick={unsuscribe} onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
			{icon}
		</ActionButton>
	);
}
