import uniqid from 'uniqid';
import { useCoursesContext } from 'src/contexts/courses/courses.context';
import { useAuthContext } from 'src/contexts/auth/auth.context';
import List from 'src/components/common/list';
import NewCourse from './new-course';
import Course from './course';
import CoursePreload from './preload';
import './section.scss';

const NUMBER_OF_ELEMENTS_BY_DEFAULT = 20;

export default function CoursesSection() {
	const { courses, isLoading, search } = useCoursesContext();
	const { user } = useAuthContext();
	const theresQueries = search.value !== '' || search.selectedFilter !== '';
	const isUserAuthorized = user.role === 'teacher' || user.role === 'admin';
	const showCreateCourse = isUserAuthorized && !theresQueries;

	const coursesElements = courses.map((item) => <Course key={item.id} course={item} />);
	const preloadElements = Array(NUMBER_OF_ELEMENTS_BY_DEFAULT)
		.fill()
		.map(() => <CoursePreload key={uniqid()} />);

	const elements = isLoading ? preloadElements : coursesElements;

	return (
		<div className="course-section">
			<List>
				{showCreateCourse && <NewCourse />}
				{elements}
			</List>
		</div>
	);
}
