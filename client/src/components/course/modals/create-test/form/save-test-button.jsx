import { useParams } from 'react-router-dom';
import { useCreateTextContext } from './context';
import { testService } from 'src/services/test';

export default function SaveTestButton() {
	const { questions, title } = useCreateTextContext();
	const { episodeId } = useParams();
	const isButtonDisabled = questions.length === 0;

	function saveTest() {
		const test = { title: title.value, questions };
		testService.create(episodeId, test);
	}

	function test() {
		testService.getOne(episodeId).then((response) => console.log(response));
	}

	return (
		<>
			<button onClick={saveTest} disabled={isButtonDisabled} className="default-button">
				Add test
			</button>
			<button onClick={test}>TEST</button>
		</>
	);
}
