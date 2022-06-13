import { useParams, useNavigate } from 'react-router-dom';

import { useCourses, useLoggedUser, useUsers } from 'hooks';
import Modal from 'components/modal';


const SuscribeCourse = () => {
    const { coursesList } = useCourses();
    const { setUsersList } = useUsers();
    const { loggedUser } = useLoggedUser();
    const { courseId } = useParams();
    const navigateTo = useNavigate();
    

    // Suscribe the loggedUser student to the selected course 
    const suscribeUser = () => {
        const { days } = coursesList.filter(course => course.id === courseId)[0];

        setUsersList(prevUsers => (
            prevUsers.map(user => {
                if (user.mail === loggedUser.mail) {
                    return {
                        ...user,
                        courses: [...user.courses, courseId],
                        busyDays: [...user.busyDays, days]
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
                    <h1>Subscribe to the course</h1>
                    <p>We are very proud that you have decided to trust us!</p>

                    <div className="action-container">
                        <button 
                         className="button cancel"
                         onClick={() => navigateTo(-1, { replace: true })}
                        >
                            Cancel
                        </button>

                        <button 
                         className="button button-green"
                         onClick={suscribeUser}
                        >
                            Suscribe
                        </button>
                    </div>
                </article>
            </Modal>
        </main>
    )
}

export default SuscribeCourse;