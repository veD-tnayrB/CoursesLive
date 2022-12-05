import * as React from 'react';
import { CoursesContext } from 'src/contexts/courses/courses.context';
import { courseService } from 'src/services/courses';
import SearchCourses from 'src/components/courses/search';
import Header from 'src/components/common/header';
import RegisterModal from 'src/components/common/modals/register-modal';
import CreateCourseModal from 'src/components/courses/modals/create-modal';
import DeleteCourseModal from 'src/components/courses/modals/delete-modal';
import CoursesSection from 'src/components/courses/section';
import EditCourseModal from 'src/components/courses/modals/edit-modal';
import useDocumentTitle from 'src/hooks/useDocumentTitle';

const MODAL_DEFAULT_VALUES = {
	register: { show: false, payload: {} },
	create: { show: false, payload: {} },
	delete: { show: false, payload: {} },
	edit: { show: false, payload: {} },
};

export default function Courses() {
	useDocumentTitle('Courses - CoursesLive');
	const [courses, setCourses] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);
	const [modals, setModals] = React.useState(MODAL_DEFAULT_VALUES);
	const [search, setSearch] = React.useState({ selectedFilter: '', value: '' });

	React.useEffect(() => {
		const controller = new AbortController();
		const signal = controller.signal;

		setIsLoading(true);

		courseService.getAll(signal, search.value, search.selectedFilter).then((response) => {
			setCourses(response);
			setIsLoading(false);
		});

		return () => controller.abort();
	}, [search]);

	const contextValue = {
		courses,
		setCourses,
		modals,
		setModals,
		isLoading,
		setIsLoading,
		search,
		setSearch,
	};
	return (
		<CoursesContext.Provider value={contextValue}>
			<div className="courses-page page">
				<Header className="subtitle">
					<h2>Courses</h2>
				</Header>
				<SearchCourses setSearchResults={setCourses} />

				<CoursesSection />

				<RegisterModal modals={modals} setModals={setModals} title="You need an account to subscribe!!" />
				<CreateCourseModal />
				<DeleteCourseModal />
				<EditCourseModal />
			</div>
		</CoursesContext.Provider>
	);
}
