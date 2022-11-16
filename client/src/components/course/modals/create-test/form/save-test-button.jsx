import { useParams } from 'react-router-dom';
import { useCreateTextContext } from './context';
import { testService } from 'src/services/test';

export default function SaveTestButton() {
	const { questions, title } = useCreateTextContext();
	const { episodeId } = useParams();
	const isButtonDisabled = questions.length === 0;

	function saveTest() {
		const test = { title, questions };
		testService.create(episodeId, test);
	}

	return (
		<button onClick={saveTest} disabled={isButtonDisabled} className="default-button">
			Add test
		</button>
	);
}
