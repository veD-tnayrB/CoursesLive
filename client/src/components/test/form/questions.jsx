import { useTestContext } from '../context';
import uniqid from 'uniqid';
import Question from './question';
import LoadingIcon from 'src/components/common/load';

export default function TestQuestions() {
	const { test, showResults, isLoading } = useTestContext();
	const questionsElements = test.questions.map((question) => <Question key={uniqid()} question={question} showResults={showResults} />);

	if (isLoading) return <LoadingIcon />;
	return <ul className="question-list">{questionsElements}</ul>;
}
