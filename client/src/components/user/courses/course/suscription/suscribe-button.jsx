import * as React from 'react';
import { courseService } from 'src/services/courses';
import { useCourseItemContext } from '../context';
import ActionButton from 'src/components/common/action-button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function SuscribeButton({ courseId }) {
	const [isButtonHovered, setIsButtonHovered] = React.useState(false);
	const { setIsSuscribed } = useCourseItemContext();

	function suscribe({ isLoading, setIsLoading }) {
		if (isLoading) return;
		setIsLoading(true);
		setIsSuscribed(true);

		courseService
			.suscribe(courseId)
			.then(() => {
				setIsLoading(false);
			})
			.catch(() => {
				setIsSuscribed(false);
				setIsLoading(false);
			});
	}

	function toggleHover() {
		setIsButtonHovered(!isButtonHovered);
	}

	const icon = isButtonHovered ? <FavoriteIcon className="icon" /> : <FavoriteBorderIcon className="icon" />;

	return (
		<ActionButton title="Suscribe" className="suscription default-button" onMouseEnter={toggleHover} onMouseLeave={toggleHover} onClick={suscribe}>
			{icon}
			<span>Suscribe</span>
		</ActionButton>
	);
}
