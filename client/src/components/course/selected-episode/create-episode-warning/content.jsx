import { useUserContext } from 'src/contexts/user/user.context';
import { useCourseContext } from 'src/contexts/course/course.context';

export default function CreateEpisode() {
	const { course, setModals } = useCourseContext();
	const { user } = useUserContext();
	const canCreateEpisode = user.role === 'admin' || course.creator.id === user.id;

	function openCreateEpisodeModal() {
		setModals((otherModals) => ({ ...otherModals, create: { ...otherModals.create, show: true } }));
	}

	return (
		<article className="message">
			<div className="content-container">
				<h2>Oops, looks like theres no episodes here</h2>

				{canCreateEpisode && (
					<p>
						It looks like you haven't uploaded any episode yet, don't worry, you upload it and we'll take
						care of the rest.
					</p>
				)}

				{canCreateEpisode && (
					<button onClick={openCreateEpisodeModal} className="primary-button">
						Upload episode!
					</button>
				)}
			</div>
		</article>
	);
}
