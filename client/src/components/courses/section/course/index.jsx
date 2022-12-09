import * as React from 'react';
import { useAuthContext } from 'src/contexts/auth/auth.context';
import { Link } from 'react-router-dom';
import { IMAGES_ROUTES } from 'src/services/config';
import { CourseItemContext } from './context';
import Card from 'src/components/common/card';
import CourseAdminActions from './admin';
import Suscription from './suscription';
import { courseMediaBasePaths } from 'src/services/config';
import './course.scss';

const COLORS_BY_LEVEL = {
	Beginner: 'blue',
	'Mid Level': 'green',
	Senior: 'red',
};

export default function Course({ course }) {
	const { user } = useAuthContext();
	const isUserSuscribed = course.subscribers?.some((suscriber) => suscriber === user.id);
	const [isSuscribed, setIsSuscribed] = React.useState(isUserSuscribed);
	const isUserAdmin = user.role === 'admin';
	const levelClass = COLORS_BY_LEVEL[course.level];
	const firstEpisode = course.episodes[0];

	const to = `/courses/course/${course.id}/episode/${firstEpisode}`;
	const courseStatus = isSuscribed ? 'suscribed' : 'unsuscribed';

	const coverSrc = `${courseMediaBasePaths.cover}${course.folder}/${course.cover}`;

	const contextValue = {
		isSuscribed,
		setIsSuscribed,
		course,
	};
	return (
		<CourseItemContext.Provider value={contextValue}>
			<div className="course">
				<Link to={to}>
					<div className="cover-container">
						<img className="cover" src={coverSrc} alt="" />
					</div>
				</Link>

				<Card className="course-item">
					<header>
						<div className="info-container">
							<div className="title-container">
								<h3>{course.name}</h3>
							</div>
							<span className={levelClass}>{course.level}</span>
						</div>

						<img src={`${IMAGES_ROUTES}${course.creator?.profileImage}`} />
					</header>
					<div className={`actions-container ${courseStatus}`}>
						{isUserAdmin && <CourseAdminActions course={course} />}

						<div className="end-button">
							<Suscription courseId={course.id} />
						</div>

						{isSuscribed && (
							<Link to={to} className="default-button course-button">
								See course
							</Link>
						)}
					</div>
				</Card>
			</div>
		</CourseItemContext.Provider>
	);
}
