import * as React from 'react';
import uniqid from 'uniqid';
import AddIcon from '@mui/icons-material/Add';
import ValidationInput from 'src/components/common/validation-input';
import NewOption from './new-option';
import SaveQuestion from './save-question';
import { inputHandleChange } from 'src/utils/input';

export default function NewQuestion({ selectedQuestion }) {
	const [title, setTitle] = React.useState(selectedQuestion.title ?? '');
	const [options, setOptions] = React.useState(selectedQuestion.options ?? []);

	function handleChange(event) {
		inputHandleChange(event, setTitle);
	}

	function addOption() {
		const isCorrect = options.length === 0;
		const newOption = { value: '', isCorrect, id: uniqid() };
		setOptions([...options, newOption]);
	}

	const optionsElements = options.map((option, index) => (
		<NewOption key={option.id} option={option} index={index + 1} setOptions={setOptions} />
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

			<SaveQuestion title={title} options={options} />
		</section>
	);
}
