import DeleteModal from 'src/components/common/modals/delete-modal';
import { useNavigate, useParams } from 'react-router-dom';
import { useCourseContext } from 'src/contexts/course/course.context';
import { episodeService } from 'src/services/episodes';

export default function DeleteEpisodeModal() {
	const { modals, setModals, setSelectedEpisode, course, setCourse, selectedEpisode } = useCourseContext();
	const navigateTo = useNavigate();
	const { courseId } = useParams();

	function remove({ setIsLoading }) {
		setIsLoading(true);
		const episodes = course.episodes;
		const nextEpisode = episodes.find((episode) => episode.id !== selectedEpisode.id);

		if (nextEpisode) {
			setSelectedEpisode(nextEpisode);
			navigateTo(`/courses/course/${courseId}/episode/${nextEpisode.id}`);
		}

		setCourse((otherValues) => ({
			...otherValues,
			episodes: otherValues.episodes.filter((episode) => episode.id !== selectedEpisode.id),
		}));

		episodeService.removeEpisode(courseId, selectedEpisode.id).then(() => {
			setIsLoading(false);
			setModals((otherModals) => ({ ...otherModals, delete: { ...otherModals.delete, show: false } }));
		});
	}

	return <DeleteModal modals={modals} setModals={setModals} description="When you delete a episode you lose all the information about it, likes, tests." remove={remove} />;
}
