import { useTestFormContext } from './context';
import CheckBox from 'src/components/common/form/checkbox';

export default function Option({ questionId, option, correctOption }) {
	const { showResults, selectedOptions, setSelectedOptions } = useTestFormContext();
	console.log(1, selectedOptions);
	const { selectedOption } = selectedOptions.length > 0 && selectedOptions?.find((question) => question.id === questionId);
	console.log(selectedOption);
	const isOptionSelected = selectedOption === option.value;
	const isOptionCorrect = showResults && correctOption.id === option.id;
	const correctClass = showResults ? (isOptionCorrect ? 'correct' : isOptionSelected ? 'incorrect' : '') : '';
	const isCheckboxDisabled = showResults;

	function handleChange(event) {
		const { value } = event.target;
		setSelectedOption(value);
	}

	return (
		<li className={correctClass}>
			<CheckBox disabled={isCheckboxDisabled} handleChange={handleChange} checkbox={{ label: option.value, value: option.value }} selectedOption={selectedOption} />
		</li>
	);
}
