import * as React from 'react';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ValidationInput from 'src/components/common/validation-input';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';

export default function NewOption({ option, setOptions }) {
	const index = option.index;
	const isOptionSelected = option.isCorrect;

	function selectOption() {
		if (isOptionSelected) return;

		setOptions((prevOptions) =>
			prevOptions.map((element) => {
				if (element.isCorrect) {
					return { ...element, isCorrect: false };
				}

				if (element.index === index) return { ...element, isCorrect: true };
				return element;
			})
		);
	}

	function onChange(event) {
		const { value } = event.target;

		setOptions((otherOptions) =>
			otherOptions.map((option) => {
				if (option.index !== index) return option;
				return {
					...option,
					value,
				};
			})
		);
	}

	function remove() {
		setOptions((prevOptions) => prevOptions.filter((element) => element.index !== index));
	}

	return (
		<li className="new-option">
			<div className="main-actions-container">
				<ValidationInput
					name="option"
					onChange={onChange}
					value={option.value}
					placeholder={`Option #${index}`}
					isCorrect={option.value}
				/>

				<div className="actions">
					<button
						onClick={selectOption}
						className="save-option action-button"
						title="Select option as correct">
						{isOptionSelected && <CheckIcon />}
					</button>

					<button onClick={remove} className="delete-option action-button">
						<DeleteIcon className="icon" />
					</button>
				</div>
			</div>
		</li>
	);
}
