import { useCreateTextContext } from './context';

export default function SaveTestButton() {
	const { questions } = useCreateTextContext();
	const isButtonDisabled = questions.length === 0;

	return (
		<button disabled={isButtonDisabled} className="default-button">
			Add test
		</button>
	);
}
