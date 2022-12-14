import * as React from 'react';
import uniqid from 'uniqid';
import AddIcon from '@mui/icons-material/Add';
import { inputHandleChange } from 'src/utils/input';
import ValidationInput from 'src/components/common/form/validation-input';
import NewOption from './new-option';
import SaveQuestion from './save-question';

export default function NewQuestion({ selectedQuestion }) {
	const [title, setTitle] = React.useState(selectedQuestion.title ?? '');
	const [options, setOptions] = React.useState(selectedQuestion.options ?? []);
	const [correctOption, setCorrectOption] = React.useState(selectedQuestion.correct_option ?? options[0]);

	function handleChange(event) {
		inputHandleChange(event, setTitle);
	}

	function addOption() {
		const newOption = { value: '', id: uniqid() };
		if (options.length === 0) setCorrectOption(newOption);
		setOptions([...options, newOption]);
	}

	const optionsElements = options.map((option, index) => <NewOption key={option.id} options={options} question={selectedQuestion} correctOption={correctOption} setCorrectOption={setCorrectOption} option={option} index={index + 1} setOptions={setOptions} />);

	return (
		<section className="new-question">
			<div className="main-actions-container">
				<ValidationInput name="question" onChange={handleChange} value={title} placeholder="Question" isCorrect={title.length > 2} />
				<button onClick={addOption} title="Add option" type="button" className="create-question-button action-button">
					<AddIcon className="icon" />
				</button>
			</div>

			<ul className="question-list">{optionsElements}</ul>
			<SaveQuestion title={title} options={options} correctOption={correctOption} />
		</section>
	);
}
