import * as React from 'react';
import CheckBox from 'src/components/common/form/checkbox';
import { useTestContext } from '../context';

export default function Question({ question }) {
	const [selectedOption, setSelectedOption] = React.useState(question.options[0].value);
	function handleChange(event) {
		const { value } = event.target;
		setSelectedOption(value);
	}

	const optionsElements = question.options.map((option) => (
		<li key={option._id}>
			<CheckBox handleChange={handleChange} checkbox={{ label: option.value, value: option.value }} selectedOption={selectedOption} />
		</li>
	));

	return (
		<li>
			<h3>{question.title}</h3>
			<ul>{optionsElements}</ul>
		</li>
	);
}
