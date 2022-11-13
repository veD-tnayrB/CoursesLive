import * as React from 'react';
import ValidationInput from 'src/components/common/validation-input';
import CreateQuestionButton from './new-question';
import Question from './question';
import NewQuestion from './new-question/new-question';
import useForm from 'src/hooks/useForm';
import { CreateTestContext } from './context';

const titlePattern = /.{5,50}/;

const FORM_VALUES = {
	title: { value: '', isCorrect: false, validation: titlePattern },
};

export default function CreateTestForm() {
	const [createQuestion, setCreateQuestion] = React.useState(false);
	const [questions, setQuestions] = React.useState([]);
	const { form, handleChanges } = useForm(FORM_VALUES);

	function onSubmit(event) {
		event.preventDefault();
	}

	const questionsElements = questions.map((question) => <Question question="che" options={[]} />);

	const contextValue = {
		createQuestion,
		setCreateQuestion,
		questions,
		setQuestions,
	};
	return (
		<CreateTestContext.Provider value={contextValue}>
			<form onSubmit={onSubmit}>
				<ValidationInput
					name="title"
					isCorrect={form.title.isCorrect}
					value={form.title.value}
					onChange={handleChanges}
					placeholder="Title"
				/>
				<CreateQuestionButton />
				{createQuestion && <NewQuestion />}

				<ul>{questionsElements}</ul>
			</form>
		</CreateTestContext.Provider>
	);
}
