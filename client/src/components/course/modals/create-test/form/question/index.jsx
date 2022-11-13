import * as React from 'react';
import CheckBox from 'src/components/common/form/checkbox';

export default function Question({ question, options }) {
	const [selectedOption, setSelectedOption] = React.useState('');

	function handleChange(event) {
		const { value } = event.target;
		setSelectedOption(value);
	}

	const questionOptions = options.map((option) => (
		<CheckBox key={option.value} checkbox={option} selectedOption={selectedOption} handleChange={handleChange} />
	));

	return (
		<li>
			<article className="question">
				<p>{question}</p>
				{questionOptions}
			</article>
		</li>
	);
}
