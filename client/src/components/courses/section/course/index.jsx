import * as React from 'react';
import { useUserContext } from 'src/contexts/user/user.context';
import { Link } from 'react-router-dom';
import { IMAGES_ROUTES } from 'src/services/config';
import Card from 'src/components/common/card';
import CourseAdminActions from './admin';
import Suscription from './suscription';
import './course.scss';

const COLORS_BY_LEVEL = {
    'Beginner': 'blue',
    'Mid Level': 'green',
    'Senior': 'red'
}

export default function Course({ course }) {
    const { user } = useUserContext();
    const isUserSuscribed = user.courses?.some(suscribedCourse => suscribedCourse === course.id);
    const isUserAdmin = user.role === 'admin';
    const levelClass = COLORS_BY_LEVEL[course.level];

    const courseStatus = isUserSuscribed ? 'suscribed' : 'unsuscribed';
    console.log(1, `${IMAGES_ROUTES}${course.creator?.profileImage}`)
    return (
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
                    <Suscription isUserSuscribed={isUserSuscribed} courseId={course.id} />
                </div>

                {
                    isUserSuscribed &&
                    <Link className="default-button course-button" to={`/courses/course/${course.id}`}>
                        See course
                    </Link>
                }
            </div>
        </Card>
    )
}