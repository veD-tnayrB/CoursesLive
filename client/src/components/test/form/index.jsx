import uniqid from 'uniqid';
import { useTestContext } from '../context';
import Question from './question';
import './form.scss';

export default function TestForm() {
	const { test } = useTestContext();

	function onSubmit(event) {
		event.preventDefault();
		console.log(test);
	}

	const questionsElements = test.questions.map((question) => <Question key={uniqid()} question={question} />);

	return (
		<form onSubmit={onSubmit} className="test-response-form">
			<ul className="question-list">{questionsElements}</ul>
			<button onClick={onSubmit} className="send-test default-button">
				SEND TEST
			</button>
		</form>
	);
}
