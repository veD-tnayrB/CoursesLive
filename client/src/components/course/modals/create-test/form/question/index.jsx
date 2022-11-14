import * as React from 'react';
import CheckBox from 'src/components/common/form/checkbox';
import EditIcon from '@mui/icons-material/Edit';
import { useCreateTextContext } from '../context';

export default function Question({ question }) {
	const [selectedOption, setSelectedOption] = React.useState(question.options[0].value);
	const { setQuestions, setSelectedQuestion } = useCreateTextContext();

	function handleChange(event) {
		const { value } = event.target;
		setSelectedOption(value);
	}

	function selectQuestion() {
		setSelectedQuestion(question);
		setQuestions((prevValues) => prevValues.filter((prevQuestion) => prevQuestion.title !== question.title));
	}

	const questionOptions = question.options.map((option) => (
		<li key={option.value}>
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
					<button onClick={selectQuestion}>
						<EditIcon className="icon" />
						Edit
					</button>
				</div>
				<ul>{questionOptions}</ul>
			</article>
		</li>
	);
}
