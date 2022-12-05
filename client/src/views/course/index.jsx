import * as React from 'react';
import { useUserContext } from 'src/contexts/user/user.context';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { courseService } from 'src/services/courses';
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
import CreateTestModal from 'src/components/course/modals/create-test';
import Preloads from 'src/components/course/preloads';
import RegisterModal from 'src/components/common/modals/register-modal';
import './course.scss';

const MODALS = {
	create: { show: false, payload: {} },
	delete: { show: false, payload: {} },
	edit: { show: false, payload: {} },
	createTest: { show: false, payload: {} },
};

const DEFAULT_COURSE = {
	name: '',
	creator: { name: '', profileImage: '', id: '' },
	episodes: [],
	subscribers: [],
};

export const DEFAULT_SELECTED_EPISODE = {
	title: '',
	video: '',
	peopleWhoLikedIt: [],
	comments: [],
	description: '',
	itsEmpty: true,
};

export default function Course() {
	const { courseId, episodeId } = useParams();
	const { user, isUserLogged } = useUserContext();
	const [modals, setModals] = React.useState({ ...MODALS, register: { show: !isUserLogged } });
	const [course, setCourse] = React.useState(DEFAULT_COURSE);
	const [selectedEpisode, setSelectedEpisode] = React.useState(DEFAULT_SELECTED_EPISODE);
	const [isLoading, setIsLoading] = React.useState(true);
	const navigateTo = useNavigate();
	const isCourseCreator = course.creator.id === user.id;
	const theresDescription = selectedEpisode.description.length > 0;
	const isUserSuscribed = course.subscribers.includes(user.id);

	useDocumentTitle(`${course.name} - Course`);

	React.useEffect(() => {
		const controller = new AbortController();
		const signal = controller.signal;

		setIsLoading(true);

		courseService
			.getOne(signal, courseId)
			.then((response) => {
				const { episodes } = response;
				setCourse(response);
				const episode = episodes.find((episode) => episode.id === episodeId);
				if (episode) setSelectedEpisode(episode);
			})
			.finally(() => setIsLoading(false))
			.catch(() => navigateTo('/404'));

		return () => controller.abort();
	}, [courseId]);

	if (isLoading) return <Preloads />;

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
		isUserSuscribed,
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
			<CreateTestModal />
			<RegisterModal modals={modals} setModals={setModals} title="You need an account to access the content" />
			<Outlet />
		</CourseContext.Provider>
	);
}
