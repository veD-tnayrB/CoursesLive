import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { useCreateTextContext } from '../context';

export default function CreateQuestionButton() {
	const { selectedQuestion, setSelectedQuestion } = useCreateTextContext();

	function openNewQuestion() {
		setSelectedQuestion({ title: 'Question', options: [] });
	}

	const Icon = selectedQuestion?.title ? CloseIcon : AddIcon;
	const toolTip = selectedQuestion?.title ? 'Cancel question' : 'Add question';

	return (
		<button title={toolTip} onClick={openNewQuestion} className="create-question-button action-button">
			<Icon className="icon" />
		</button>
	);
}
