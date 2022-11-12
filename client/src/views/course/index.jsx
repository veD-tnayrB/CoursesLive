import * as React from 'react';
import { useUserContext } from 'src/contexts/user/user.context';
import { Outlet, useParams } from 'react-router-dom';
import { getOne } from 'src/services/courses';
import { CourseContext } from 'src/contexts/course/course.context';
import useDocumentTitle from 'src/hooks/useDocumentTitle';
import SelectedEpisode from 'src/components/course/selected-episode';
import EpisodeInfo from 'src/components/course/info';
import MainActions from 'src/components/course/main-actions';
import Episodes from 'src/components/course/episodes';
import DeleteEpisodeModal from 'src/components/course/modals/delete-episode';
import EpisodeDescription from 'src/components/course/description';
import EditEpisodeModal from 'src/components/course/modals/edit-episode';
import EpisodeComments from 'src/components/course/comments';
import './course.scss';

const MODALS = {
	create: { show: false, payload: {} },
	delete: { show: false, payload: {} },
	edit: { show: false, payload: {} },
};

const DEFAULT_COURSE = {
	name: '',
	creator: { name: '', profileImage: '', id: '' },
	episodes: [],
};

const DEFAULT_SELECTED_EPISODE = {
	title: '',
	video: '',
	peopleWhoLikedIt: [],
	comments: [],
	description: '',
};

export default function Course() {
	const { courseId, episodeId } = useParams();
	const { user } = useUserContext();
	const [modals, setModals] = React.useState(MODALS);
	const [course, setCourse] = React.useState(DEFAULT_COURSE);
	const [selectedEpisode, setSelectedEpisode] = React.useState(DEFAULT_SELECTED_EPISODE);
	const [isLoading, setIsLoading] = React.useState(true);
	const isCourseCreator = course.creator.id === user.id;
	const theresDescription = selectedEpisode.description.length > 0;

	useDocumentTitle(`${course.name} - Course`);

	React.useEffect(() => {
		const controller = new AbortController();
		const signal = controller.signal;

		setIsLoading(true);

		getOne(signal, courseId).then((response) => {
			const { episodes } = response;
			setCourse(response);
			const episode = episodes.find((episode) => episode.id === episodeId);
			if (episode) setSelectedEpisode(episode);

			setIsLoading(false);
		});

		return () => controller.abort();
	}, [courseId]);

	const contextValue = {
		course,
		setCourse,
		selectedEpisode,
		setSelectedEpisode,
		isLoading,
		setIsLoading,
		modals,
		setModals,
		isCourseCreator,
	};
	return (
		<CourseContext.Provider value={contextValue}>
			<div className="course-page">
				<SelectedEpisode />

				<section className="hotbar">
					<div className="episode-info-container">
						<EpisodeInfo />
						<MainActions />
						{theresDescription && <EpisodeDescription />}
						<EpisodeComments />
					</div>
					<Episodes />
				</section>
			</div>

			<DeleteEpisodeModal />
			<EditEpisodeModal />
			<Outlet />
		</CourseContext.Provider>
	);
}
