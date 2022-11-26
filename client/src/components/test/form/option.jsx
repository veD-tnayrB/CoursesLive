import { useTestContext } from '../context';
import CheckBox from 'src/components/common/form/checkbox';

export default function Option({ options, option, correctOption }) {
	const { selectedOptions, setSelectedOptions, showResults } = useTestContext();
	const isOptionSelected = selectedOptions.length > 0 && selectedOptions?.find((opt) => opt.id === option._id);

	const isOptionCorrect = showResults && correctOption.id === option.id;
	const correctClass = showResults ? (isOptionCorrect ? 'correct' : isOptionSelected ? 'incorrect' : '') : '';
	const isCheckboxDisabled = showResults;

	function handleChange() {
		setSelectedOptions((otherValues) => {
			return otherValues.map((opt) => {
				const isQuestionOption = options.some((element) => element._id === opt.id);

				if (!isQuestionOption) return opt;
				return { id: option._id };
			});
		});
	}

	return (
		<li className={correctClass}>
			<CheckBox disabled={isCheckboxDisabled} handleChange={handleChange} checkbox={{ label: option.value, value: option.value }} selectedOption={isOptionSelected && option.value} />
		</li>
	);
}
