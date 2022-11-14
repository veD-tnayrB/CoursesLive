import * as React from 'react';
import ValidationInput from 'src/components/common/validation-input';
import CreateQuestionButton from './new-question';
import Question from './question';
import NewQuestion from './new-question/new-question';
import useForm from 'src/hooks/useForm';
import { CreateTestContext } from './context';
import './form.scss';

const titlePattern = /.{5,50}/;

const FORM_VALUES = {
	title: { value: '', isCorrect: false, validation: titlePattern },
};

export default function CreateTestForm() {
	const [selectedQuestion, setSelectedQuestion] = React.useState(false);
	const [questions, setQuestions] = React.useState([]);
	const { form, handleChanges } = useForm(FORM_VALUES);

	function onSubmit(event) {
		event.preventDefault();
	}

	const questionsElements = questions.map((question) => <Question question={question} />);

	const contextValue = {
		selectedQuestion,
		setSelectedQuestion,
		questions,
		setQuestions,
	};
	return (
		<CreateTestContext.Provider value={contextValue}>
			<form onSubmit={onSubmit} className="create-test-form">
				<div className="main-actions-container title">
					<ValidationInput
						name="title"
						isCorrect={form.title.isCorrect}
						value={form.title.value}
						onChange={handleChanges}
						placeholder="Title"
					/>
					<CreateQuestionButton />
				</div>
				{selectedQuestion?.title && <NewQuestion selectedQuestion={selectedQuestion} />}

				<ul className="questions">{questionsElements}</ul>
			</form>
		</CreateTestContext.Provider>
	);
}
