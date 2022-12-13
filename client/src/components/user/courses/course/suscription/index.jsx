import { useCourseItemContext } from '../context';
import SuscribeButton from './suscribe-button';
import UnsuscribeButton from './unsuscribe-button';

export default function Suscription({ courseId }) {
	const { isSuscribed } = useCourseItemContext();

	const Button = !isSuscribed ? SuscribeButton : UnsuscribeButton;

	return (
		<>
			<Button courseId={courseId} />
		</>
	);
}
