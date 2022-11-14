import * as React from 'react';
import AddIcon from '@mui/icons-material/Add';
import ValidationInput from 'src/components/common/validation-input';
import { useCreateTextContext } from '../context';
import NewOption from './new-option';
import { inputHandleChange } from 'src/utils/input';

export default function NewQuestion({ selectedQuestion }) {
	const { setQuestions, setSelectedQuestion } = useCreateTextContext();
	const [title, setTitle] = React.useState(selectedQuestion.title ?? '');
	const [options, setOptions] = React.useState(selectedQuestion.options ?? []);
	const theresOptions = options.length > 0;

	function handleChange(event) {
		inputHandleChange(event, setTitle);
	}

	function saveQuestion() {
		if (!theresOptions || !title) return;

		const newQuestion = {
			title,
			options,
		};

		setSelectedQuestion({});
		setQuestions((otherQuestions) => [newQuestion, ...otherQuestions]);
	}

	function addOption() {
		const isCorrect = options.length + 1 === 1;
		const newOption = { value: '', isCorrect, index: options.length + 1 };
		setOptions([...options, newOption]);
	}

	const optionsElements = options.map((option) => (
		<NewOption key={option.index} option={option} setOptions={setOptions} />
	));

	return (
		<section className="new-question">
			<div className="main-actions-container">
				<ValidationInput
					name="question"
					onChange={handleChange}
					value={title}
					placeholder="Question"
					isCorrect={title.length > 2}
				/>
				<button
					onClick={addOption}
					title="Add option"
					type="button"
					className="create-question-button action-button">
					<AddIcon className="icon" />
				</button>
			</div>

			<ul className="question-list">{optionsElements}</ul>

			<button
				disabled={!theresOptions}
				className="default-button"
				title="Save questions"
				type="button"
				onClick={saveQuestion}>
				Save Question
			</button>
		</section>
	);
}
