import * as React from 'react';
import ValidationInput from 'src/components/common/form/validation-input';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';

export default function NewOption({ option, setOptions, setCorrectOption, correctOption, options, index }) {
	const id = option.id;
	const isOptionCorrect = correctOption?.id === option.id;

	function selectOption() {
		if (isOptionCorrect) return;
		setCorrectOption(option);
	}

	function onChange(event) {
		const { value } = event.target;

		setOptions((otherOptions) =>
			otherOptions.map((option) => {
				if (option.id !== id) return option;
				return {
					...option,
					value,
				};
			})
		);

		if (isOptionCorrect) setCorrectOption({ id, value });
	}

	function remove() {
		setOptions((prevOptions) => prevOptions.filter((element) => element.id !== id));
		if (!isOptionCorrect) return;
		setCorrectOption(options[0]?.id === correctOption?.id ? options[1] : options[0]);
	}

	return (
		<li className="new-option">
			<div className="main-actions-container">
				<ValidationInput name="option" onChange={onChange} value={option.value} placeholder={`Option #${index}`} isCorrect={option.value} />

				<div className="actions">
					<button type="button" onClick={selectOption} className="save-option action-button" title="Select option as correct">
						{isOptionCorrect && <CheckIcon />}
					</button>

					<button type="button" onClick={remove} className="delete-option action-button">
						<DeleteIcon className="icon" />
					</button>
				</div>
			</div>
		</li>
	);
}
