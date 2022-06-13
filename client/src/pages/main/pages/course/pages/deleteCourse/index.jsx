import { useNavigate, useParams } from 'react-router-dom';

import Modal from 'components/modal';
import { useCourses } from 'hooks';  


const DeleteCourse = () => {
    const { setCoursesList } = useCourses();
    const { courseId } = useParams();
    const navigateTo = useNavigate();
    

    // look for the selected course and delete it for the courseList
    const deleteCourse = () => {
        setCoursesList(prevCourses => (
            prevCourses.filter(courses => courses.id !== courseId)
        ))

        navigateTo(-1, { replace: true });
    }

    return (
        <main className="modal-container">
            <Modal>
                <article>
                    <h1>Are you sure?</h1>
                    <p>This action cannot be undone.</p>

                    <div className="action-container">
                        <button 
                         className="button cancel"
                         onClick={() => navigateTo(-1, { replace: true })}
                        >
                            Cancel
                        </button>

                        <button 
                         className="button button-red"
                         onClick={deleteCourse}>
                            Delete
                        </button>
                    </div>
                </article>
            </Modal>
        </main>
    )
}

export default DeleteCourse;