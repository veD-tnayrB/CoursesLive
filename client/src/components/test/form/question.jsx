import * as React from 'react';
import Option from './option';

export default function Question({ question }) {
	const optionsElements = question.options.map((option) => <Option key={option._id} options={question.options} correctOption={question.correctOption} option={option} />);

	return (
		<li>
			<h3>{question.title}</h3>
			<ul>{optionsElements}</ul>
		</li>
	);
}
