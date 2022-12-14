import ActionButton from 'src/components/common/action-button';
import { useEpisodeContext } from 'src/contexts/episode/episode.context';

export default function CreationModalActions({ isInfoCorrect }) {
	const { setModals } = useEpisodeContext();

	function back() {
		setModals((othersModals) => ({ ...othersModals, create: { ...othersModals.create, show: false } }));
	}

	return (
		<div className="actions-container">
			<button onClick={back} type="reset" className="secondary-button">
				Back
			</button>

			<ActionButton className="primary-button" disabled={!isInfoCorrect}>
				Create
			</ActionButton>
		</div>
	);
}
