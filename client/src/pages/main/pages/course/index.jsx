import { useNavigate, Outlet } from 'react-router-dom';
import uniqid from 'uniqid';

import CourseCard from 'pages/main/components/courseCard';

import { useCourses, useLoggedUser } from 'hooks';

import Ilustration1 from './assets/images/ilustration-1-courses.svg';
import Ilustration2 from './assets/images/ilustration-2-courses.svg';
import Ilustration3 from './assets/images/ilustration-3-courses.svg';
import Ilustration4 from './assets/images/ilustration-4-courses.svg';

import './assets/sass/course.scss';


const Course = () => {
    const { coursesList } = useCourses();
    const { loggedUser } = useLoggedUser();
    const navigateTo = useNavigate();


    const coursesElement = coursesList.map(course => (
        <CourseCard 
         key={uniqid()}
         courseInfo={course}
         loggedUser={loggedUser}
        />
    ))


    return (
        <main className="courses-page page">
            <div className="title-decoration">
                <h2>Courses</h2>

                <img
                 className="ilustration ilustration-one"
                 alt=""
                 src={Ilustration1}
                />
                <img
                 className="ilustration ilustration-two"
                 alt=""
                 src={Ilustration2}
                />
                <img
                 className="ilustration ilustration-three"
                 alt=""
                 src={Ilustration3}
                />
                <img
                 className="ilustration ilustration-four"
                 alt=""
                 src={Ilustration4}
                />
                
            </div>
            {
                loggedUser.role === 'admin' &&
                <button
                 className="button create-button" 
                 onClick={() => navigateTo('new')}
                >
                    Create Course
                </button>
            }
            
            <section>
                <ul className="items-list">
                    {coursesElement}
                </ul>
            </section>
            
            <Outlet />
        </main>
    )
}

export default Course;