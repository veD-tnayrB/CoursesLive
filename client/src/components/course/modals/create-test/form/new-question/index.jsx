import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { useCreateTextContext } from '../context';

export default function CreateQuestionButton() {
	const { selectedQuestion, setSelectedQuestion, showSelectedQuestion, setShowSelectedQuestion } =
		useCreateTextContext();

	function openNewQuestion() {
		setShowSelectedQuestion(!showSelectedQuestion);
		if (!selectedQuestion.options.length) setSelectedQuestion({ title: '', options: [] });
	}

	const Icon = showSelectedQuestion ? CloseIcon : AddIcon;
	const toolTip = selectedQuestion?.title ? 'Cancel question' : 'Add question';

	return (
		<button title={toolTip} onClick={openNewQuestion} className="create-question-button action-button">
			<Icon className="icon" />
		</button>
	);
}
