import { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import { UsersContext } from 'contexts/users';
import { CoursesContext } from 'contexts/courses';
import { LoggedUser } from 'contexts/loggedUser';

import Modal from 'components/modal';


const UnsuscribeCourse = () => {
    const { coursesList } = useContext(CoursesContext);
    const { setUsersList } = useContext(UsersContext);
    const { loggedUser } = useContext(LoggedUser);
    const navigateTo = useNavigate();
    const { courseId } = useParams();


    // Unsuscribe the loggedUser to the selected course
    const unsuscribeUser = () => {
        const { days } = coursesList.filter(course => course.id === courseId)[0];

        setUsersList(prevUsers => (
            prevUsers.map(user => {
                if (user.mail === loggedUser.mail) {
                    return {
                        ...user,
                        courses: user.courses.filter(course => course !== courseId),
                        busyDays: user.busyDays.filter(day => JSON.stringify(day) !== JSON.stringify(days))
                    }
                }

                return user;
            })
        ))
        
        navigateTo(-1, { replace: true });
    }

    return (
        <main className="modal-container">
            <Modal>
                <article>
                    <h1>Unsuscribe</h1>
                    <p>
                        You are about to unsubscribe from this course.
                    </p>

                    <div className="action-container">
                        <button
                         className="button cancel"
                         onClick={() => navigateTo(-1, { replace: true })}
                        >
                            Cancel
                        </button>

                        <button
                         className="button button-red"
                         onClick={unsuscribeUser}
                        >
                            Unsuscribe
                        </button>
                    </div>
                </article>
            </Modal>
        </main>
    )
}

export default UnsuscribeCourse;