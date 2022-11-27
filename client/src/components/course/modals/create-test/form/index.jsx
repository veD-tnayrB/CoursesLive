import * as React from 'react';
import uniqid from 'uniqid';
import { CreateTestContext } from './context';
import { testService } from 'src/services/test';
import { useParams } from 'react-router-dom';
import ValidationInput from 'src/components/common/validation-input';
import CreateQuestionButton from './new-question';
import Question from './question';
import NewQuestion from './new-question/new-question';
import useForm from 'src/hooks/useForm';
import SaveTestButton from './save-test-button';
import { useCourseContext } from 'src/contexts/course/course.context';

const titlePattern = /.{5,50}/;

const FORM_VALUES = {
	title: { value: '', isCorrect: false, validation: titlePattern },
};

const DEFAULT_QUESTION = {
	title: '',
	options: [
		{ value: '', id: 1 },
		{ value: '', id: 2 },
		{ value: '', id: 3 },
	],
	correct_option: { value: '', id: 1 },
};

export default function CreateTestForm() {
	const [selectedQuestion, setSelectedQuestion] = React.useState(DEFAULT_QUESTION);
	const [showSelectedQuestion, setShowSelectedQuestion] = React.useState(true);
	const [questions, setQuestions] = React.useState([]);
	const { form, handleChanges } = useForm(FORM_VALUES);
	const { setModals, setSelectedEpisode } = useCourseContext();
	const { episodeId } = useParams();

	function onSubmit(event) {
		event.preventDefault();
		const test = { title: form.title.value, questions };

		testService.create(episodeId, test).then((response) => {
			setSelectedEpisode((otherProperties) => ({ ...otherProperties, test: response }));
			setModals((otherModals) => ({ ...otherModals, createTest: { ...otherModals.createTest, show: false } }));
		});
	}

	const cls = showSelectedQuestion ? 'open' : 'close';
	const questionsElements = questions.map((question) => <Question key={uniqid()} question={question} />);

	const contextValue = {
		selectedQuestion,
		setSelectedQuestion,
		showSelectedQuestion,
		setShowSelectedQuestion,
		questions,
		setQuestions,
		title: form.title,
	};
	return (
		<CreateTestContext.Provider value={contextValue}>
			<form onSubmit={onSubmit} className={`create-test-form ${cls}`}>
				<div className="main-actions-container title">
					<ValidationInput name="title" isCorrect={form.title.isCorrect} value={form.title.value} onChange={handleChanges} placeholder="Title" />
					<CreateQuestionButton />
				</div>
				{showSelectedQuestion && <NewQuestion selectedQuestion={selectedQuestion} />}

				<section className="test-results">
					<h2>{form.title.value}</h2>
					<ul className="questions">{questionsElements}</ul>
				</section>

				<SaveTestButton />
			</form>
		</CreateTestContext.Provider>
	);
}
