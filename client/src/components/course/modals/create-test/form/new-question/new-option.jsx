import * as React from 'react';
import ValidationInput from 'src/components/common/validation-input';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';

export default function NewOption({ option, setOptions, index }) {
	const id = option.id;
	const isOptionSelected = option.isCorrect;

	function selectOption() {
		if (isOptionSelected) return;

		setOptions((prevOptions) =>
			prevOptions.map((element) => {
				if (element.isCorrect) {
					return { ...element, isCorrect: false };
				}

				if (element.id === id) return { ...element, isCorrect: true };
				return element;
			})
		);
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
	}

	function remove() {
		setOptions((prevOptions) => prevOptions.filter((element) => element.id !== id));

		if (!option.isCorrect) return;

		setOptions((prevOptions) =>
			prevOptions.map((element, elementIndex, array) => {
				if (element.id === id) {
					return { ...element, isCorrect: false };
				}

				if (array[0]?.id === element.id) return { ...element, isCorrect: true };
				return element;
			})
		);
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
