import PostAddIcon from '@mui/icons-material/PostAdd';
import { useCourseContext } from 'src/contexts/course/course.context';

export default function CreateTest() {
	const { setModals } = useCourseContext();

	function openCreateTestModal() {
		setModals((prevValues) => ({ ...prevValues, createTest: { ...prevValues.createTest, show: true } }));
	}

	return (
		<button onClick={openCreateTestModal} className="action-button">
			<PostAddIcon className="icon" />
		</button>
	);
}
