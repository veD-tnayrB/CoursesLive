import { useNavigate, useParams } from 'react-router-dom';

import Modal from 'components/modal';
import { useCourses } from 'hooks';


const DeleteEpisode = () => {
    const { setCoursesList } = useCourses();
    const { courseId, episodeId } = useParams();
    const navigateTo = useNavigate();

    
    const deleteEpisode = () => {
        setCoursesList(prevCourses => (
            prevCourses.map(course => {
                if (course.id === courseId) {
                    return {
                        ...course,
                        episodes: course.episodes.filter(episodes => episodes.id !== episodeId)
                    }
                }

                return course;
            })
        ))

        navigateTo(-1, { replace: true });
    }


    return (
        <main className="modal-container">
            <Modal>
                <article>
                    <h1>Are you sure?</h1>
                    <p>This action cant be undone.</p>
                    
                    <div className="action-container">
                        <button 
                         className="button"
                         onClick={() => navigateTo(-1, { replace: true })}
                        >
                            Cancel
                        </button>

                        <button
                         className="button button-red"
                         onClick={deleteEpisode}
                        >
                            Delete
                        </button>
                    </div>
                </article>
            </Modal>
        </main>
    )
}

export default DeleteEpisode;