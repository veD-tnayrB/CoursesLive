import { useNavigate, useParams } from 'react-router-dom';

import { useCourses, useForm } from 'hooks';

import Modal from 'components/modal';
import Input from 'components/input';

import './assets/sass/modifyEpisode.scss';


const ModifyEpisode = () => {
    const { coursesList, setCoursesList } = useCourses();
    const { courseId, episodeId } = useParams();

    // Set the prev data as default values 
    const form = useForm(() => {
        const course = coursesList.find(course => course.id === courseId);
        return course.episodes.find(episode => episode.id === episodeId);
    });
    const navigateTo = useNavigate();


    // Save the new info  
    const modifyEpisode = (event) => {
        event.preventDefault();

        setCoursesList(prevCourses => (
            prevCourses.map(course => {
                if (course.id === courseId) {

                    return {
                        ...course,
                        episodes: course.episodes.map(episode => {
                            if (episode.id === episodeId) {
                                return form.info;
                            }

                            return episode;
                        })
                    }
                }

                return course;
            })
        ))

        navigateTo(-1, { replace: true });
    }
    
    const isTitleCorrect = /\w+/.test(form.info.title);
    const isLinkCorrect = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((?:\w|-){11})(?:&list=(\S+))?$/.test(form.info.link);

    return (
        <main className="modal-container">
            <Modal>
                <article>
                    <h1>Settings</h1>

                    <form onSubmit={modifyEpisode}>
                        <Input 
                         value={form.info.title}
                         onChange={form.handleChanges}
                         isCorrect={isTitleCorrect}
                         errorMessage="The title is invalid"
                         input={{
                             name: "title",
                             placeholder: "React #3 useState",
                             type: "text"
                         }}
                        />

                        <Input 
                         value={form.info.link}
                         onChange={form.handleChanges}
                         isCorrect={isLinkCorrect}
                         errorMessage="The link must be a embed link from YouTube"
                         input={{
                             name: "link",
                             placeholder: "https://youtu.be/I7yqFVEvdY0",
                             type: "text"
                         }}
                        />

                        <textarea 
                         value={form.info.overview}
                         placeholder="Add a overview"
                         onChange={form.handleChanges}
                         name="overview"
                        />

                        <div className="action-container">
                            <button
                             type="reset"
                             className="button"
                             onClick={() => navigateTo(-1, { replace: true })}
                            >
                                Cancel
                            </button>

                            <button className="button button-green">
                                Save
                            </button>
                        </div>
                    </form>
                </article>
            </Modal>
        </main>
    )
}

export default ModifyEpisode;