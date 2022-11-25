import { useTestFormContext } from './context';
import { useTestContext } from '../context';
import CheckBox from 'src/components/common/form/checkbox';

export default function Option({ questionId, option, correctOption }) {
	const { showResults } = useTestFormContext();
	const { selectedOptions, setSelectedOptions } = useTestContext();
	const { selected } = selectedOptions.length > 0 && selectedOptions?.find((question) => question.id === questionId);

	const isOptionSelected = selected.value === option.value;
	const isOptionCorrect = showResults && correctOption.id === option.id;
	const correctClass = showResults ? (isOptionCorrect ? 'correct' : isOptionSelected ? 'incorrect' : '') : '';
	const isCheckboxDisabled = showResults;

	function handleChange() {
		setSelectedOptions((otherValues) =>
			otherValues.map((question) => {
				if (question.id === questionId) return { ...question, selected: option };
				return question;
			})
		);
	}

	return (
		<li className={correctClass}>
			<CheckBox disabled={isCheckboxDisabled} handleChange={handleChange} checkbox={{ label: option.value, value: option.value }} selectedOption={selected.value} />
		</li>
	);
}
