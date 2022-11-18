import { useTestContext } from '../context';
import Question from './question';
import './form.scss';

export default function TestForm() {
	const { test } = useTestContext();

	function onSubmit(event) {
		event.preventDefault();
	}

	const questionsElements = test.questions.map((question) => <Question question={question} />);

	return (
		<form onSubmit={onSubmit} className="test-response-form">
			<ul className="question-list">{questionsElements}</ul>
			<button className="send-test default-button">SEND TEST</button>
		</form>
	);
}
