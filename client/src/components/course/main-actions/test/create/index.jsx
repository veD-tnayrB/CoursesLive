import PostAddIcon from '@mui/icons-material/PostAdd';
import { useCourseContext } from 'src/contexts/course/course.context';

export default function CreateTest({ episodeHasTest }) {
	const { setModals, selectedEpisode } = useCourseContext();
	const disabled = selectedEpisode?.itsEmpty && !episodeHasTest;

	function openCreateTestModal() {
		setModals((prevValues) => ({ ...prevValues, createTest: { ...prevValues.createTest, show: true } }));
	}

	return (
		<button disabled={disabled} onClick={openCreateTestModal} className="action-button">
			<PostAddIcon className="icon" />
		</button>
	);
}
