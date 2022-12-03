import * as React from 'react';
import { useParams } from 'react-router-dom';
import { testService } from 'src/services/test';
import { useTestContext } from '../context';
import TestQuestions from './questions';
import './form.scss';

export default function TestForm() {
	const { selectedOptions, showResults, setShowResults } = useTestContext();
	const { testId } = useParams();

	function onSubmit(event) {
		event.preventDefault();
		setShowResults(true);
		testService.saveResults(testId, selectedOptions);
	}

	return (
		<form onSubmit={onSubmit} className="test-response-form">
			<TestQuestions />
			<button disabled={showResults} onClick={onSubmit} className="send-test default-button">
				SEND TEST
			</button>
		</form>
	);
}
