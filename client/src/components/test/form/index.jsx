import * as React from 'react';
import uniqid from 'uniqid';
import { useParams } from 'react-router-dom';
import { testService } from 'src/services/test';
import { TestFormContext } from './context';
import { useTestContext } from '../context';
import Question from './question';
import './form.scss';

export default function TestForm() {
	const { test, selectedOptions } = useTestContext();
	const [showResults, setShowResults] = React.useState(false);
	const { testId } = useParams();

	function onSubmit(event) {
		event.preventDefault();
		setShowResults(true);
		testService.saveResults(testId, selectedOptions);
	}

	const questionsElements = test.questions.map((question) => <Question key={uniqid()} question={question} showResults={showResults} />);

	const contextValue = {
		showResults,
		setShowResults,
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
