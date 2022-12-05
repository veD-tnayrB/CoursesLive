import DeleteModal from 'src/components/common/modals/delete-modal';
import { useNavigate, useParams } from 'react-router-dom';
import { useCourseContext } from 'src/contexts/course/course.context';
import { episodeService } from 'src/services/episodes';
import { DEFAULT_SELECTED_EPISODE } from 'src/views/course';

export default function DeleteEpisodeModal() {
	const { modals, setModals, setSelectedEpisode, course, selectedEpisode } = useCourseContext();
	const navigateTo = useNavigate();
	const { courseId } = useParams();

	function remove({ setIsLoading }) {
		setIsLoading(true);
		const episodes = course.episodes;
		const nextEpisode = episodes.find((episode) => episode.id !== selectedEpisode.id);

		if (nextEpisode) {
			setSelectedEpisode(nextEpisode);
			navigateTo(`/courses/course/${courseId}/episode/${nextEpisode.id}`);
			return;
		}

		setSelectedEpisode(DEFAULT_SELECTED_EPISODE);

		episodeService.remove(courseId, selectedEpisode.id).then(() => {
			setIsLoading(false);
			setModals((otherModals) => ({ ...otherModals, delete: { ...otherModals.delete, show: false } }));
			navigateTo(`/courses/course/${courseId}/episode/${undefined}`);
		});
	}

	return <DeleteModal modals={modals} setModals={setModals} description="When you delete a episode you lose all the information about it, likes, tests." remove={remove} />;
}
