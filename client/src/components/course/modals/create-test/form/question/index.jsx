import * as React from 'react';
import uniqid from 'uniqid';
import CheckBox from 'src/components/common/form/checkbox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCreateTextContext } from '../context';

export default function Question({ question }) {
	const [selectedOption, setSelectedOption] = React.useState(question.options[0].value);
	const { setQuestions, setSelectedQuestion, setShowSelectedQuestion } = useCreateTextContext();

	function handleChange(event) {
		const { value } = event.target;
		setSelectedOption(value);
	}

	function selectQuestion() {
		setShowSelectedQuestion(true);
		setSelectedQuestion(question);
		setQuestions((prevValues) => prevValues.filter((prevQuestion) => prevQuestion.title !== question.title));
	}

	function removeQuestion() {
		setQuestions((prevValues) => prevValues.filter((prevValues) => prevValues.id !== question.id));
	}

	const questionOptions = question.options.map((option) => (
		<li key={uniqid()}>
			<CheckBox
				checkbox={{ value: option.value, label: option.value }}
				selectedOption={selectedOption}
				handleChange={handleChange}
			/>
		</li>
	));

	return (
		<li>
			<article className="question">
				<div className="main-information">
					<p>{question.title}</p>

					<div className="actions">
						<button onClick={removeQuestion}>
							<DeleteIcon className="icon" />
							Delete
						</button>

						<button onClick={selectQuestion}>
							<EditIcon className="icon" />
							Edit
						</button>
					</div>
				</div>
				<ul>{questionOptions}</ul>
			</article>
		</li>
	);
}
