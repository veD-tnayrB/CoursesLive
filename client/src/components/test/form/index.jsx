import * as React from 'react';
import uniqid from 'uniqid';
import { useParams } from 'react-router-dom';
import { testService } from 'src/services/test';
import { TestFormContext } from './context';
import { useTestContext } from '../context';
import Question from './question';
import './form.scss';

export default function TestForm() {
	const { test } = useTestContext();
	console.log(0, test.questions);
	const [selectedOptions, setSelectedOptions] = React.useState(test.questions.map((question) => ({ id: question.id, selectedOption: question.options[0] })));
	console.log(-1, selectedOptions);
	const [showResults, setShowResults] = React.useState(false);
	const { testId } = useParams();

	function onSubmit(event) {
		event.preventDefault();
		setShowResults(true);
		//testService.saveResults(testId);
	}

	const questionsElements = test.questions.map((question) => <Question key={uniqid()} question={question} showResults={showResults} />);

	const contextValue = {
		showResults,
		setShowResults,
		selectedOptions,
		setSelectedOptions,
	};
	return (
		<TestFormContext.Provider value={contextValue}>
			<form onSubmit={onSubmit} className="test-response-form">
				<ul className="question-list">{questionsElements}</ul>
				<button onClick={onSubmit} className="send-test default-button">
					SEND TEST
				</button>
			</form>
		</TestFormContext.Provider>
	);
}
