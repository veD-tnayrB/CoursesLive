import * as React from 'react';
import { useTestFormContext } from './context';
import Option from './option';

export default function Question({ question }) {
	const [selectedOption, setSelectedOption] = React.useState(question.options[0].value);
	const { showResults } = useTestFormContext();
	const optionsElements = question.options.map((option) => <Option key={option._id} correctOption={question.correctOption} showResults={showResults} option={option} setSelectedOption={setSelectedOption} selectedOption={selectedOption} />);

	return (
		<li>
			<h3>{question.title}</h3>
			<ul>{optionsElements}</ul>
		</li>
	);
}
