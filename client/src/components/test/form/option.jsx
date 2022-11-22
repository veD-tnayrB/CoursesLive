import { useTestFormContext } from './context';
import CheckBox from 'src/components/common/form/checkbox';

export default function Option({ option, correctOption, setSelectedOption, selectedOption }) {
	const { showResults } = useTestFormContext();
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
