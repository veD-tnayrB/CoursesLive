import * as React from 'react';
import AddIcon from '@mui/icons-material/Add';
import ValidationInput from 'src/components/common/validation-input';
import useForm from 'src/hooks/useForm';
import { useCreateTextContext } from '../context';

const questionTitlePattern = /.{8,100}/;

const FORM_VALUES = {
	question: { value: '', isCorrect: false, validation: questionTitlePattern },
};

export default function NewQuestion() {
	const { setQuestions, setCreateQuestion } = useCreateTextContext();
	const { form, handleChanges } = useForm(FORM_VALUES);
	const [options, setOptions] = React.useState([]);
	const theresOptions = options.length > 0;

	function saveQuestion() {
		if (!theresOptions) return;

		const newQuestion = {
			question: form.question.value,
			options,
		};

		setCreateQuestion(false);
		setQuestions((otherQuestions) => [newQuestion, ...otherQuestions]);
	}

	return (
		<section>
			<ValidationInput
				name="question"
				onChange={handleChanges}
				value={form.question.value}
				placeholder="Insert question"
				isCorrect={form.question.isCorrect}
			/>
			<button type="button">
				<AddIcon />
			</button>

			<button disabled={!theresOptions} className="default-button" type="button" onClick={saveQuestion}>
				Save
			</button>
		</section>
	);
}
