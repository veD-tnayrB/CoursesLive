import { useCreateTextContext } from '../context';

export default function SaveQuestion({ title, options }) {
	const { setQuestions, setSelectedQuestion, setShowSelectedQuestion } = useCreateTextContext();
	const theresOptions = options.length >= 2 && options.every((option) => option.value) && title.length >= 3;

	function saveQuestion() {
		if (!theresOptions || !title) return;

		const newQuestion = {
			title,
			options,
		};

		setSelectedQuestion({ title: '', options: [] });
		setShowSelectedQuestion(false);
		setQuestions((otherQuestions) => [newQuestion, ...otherQuestions]);
	}

	return (
		<button
			disabled={!theresOptions}
			className="default-button"
			title="Save questions"
			type="button"
			onClick={saveQuestion}>
			Save Question
		</button>
	);
}
