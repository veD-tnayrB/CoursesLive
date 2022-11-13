import AddIcon from '@mui/icons-material/Add';
import { useCreateTextContext } from '../context';

export default function CreateQuestionButton() {
	const { setCreateQuestion } = useCreateTextContext();

	function openNewQuestion() {
		setCreateQuestion(true);
	}

	return (
		<button onClick={openNewQuestion} className="create-question-button">
			<AddIcon className="icon" />
		</button>
	);
}
