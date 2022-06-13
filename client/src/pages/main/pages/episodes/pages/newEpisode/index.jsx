import { useNavigate, useParams } from 'react-router-dom';
import uniqid from 'uniqid';

import Modal from 'components/modal';
import Input from 'components/input';

import { useCourses, useForm } from 'hooks';

import './assets/sass/newEpisode.scss';


const NewEpisode = () => {
    const form = useForm({
        id: uniqid(),
        title: '',
        link: '',
        overview: ''
    })
    const { setCoursesList } = useCourses();
    const { courseId } = useParams();
    const navigateTo = useNavigate();


    const addEpisode = (event) => {
        event.preventDefault();

        setCoursesList(prevCourses => (
            prevCourses.map(course => {
                if (course.id === courseId) {
                    return {
                        ...course,
                        episodes: [...course.episodes, form.info]
                    }
                }

                return course;
            })
        ))

        navigateTo(-1, { replace: true });
    }

    // Episodes Validators
    const isTitleCorrect = /.{2,25}/.test(form.info.title);
    const isLinkCorrect = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((?:\w|-){11})(?:&list=(\S+))?$/.test(form.info.link);

    const validators = [isTitleCorrect, isLinkCorrect];
    const theresSomethingWrong = validators.some(validator => validator === false);


    return (
        <main className="modal-container">
            <Modal>
                <article>
                    <h1>New Episode</h1>
                    <p>
                        Start sharing your knowledge through our platform!
                    </p>

                    <form onSubmit={addEpisode}>
                        <Input 
                         label="Episode Title"
                         value={form.info.title}
                         onChange={form.handleChanges}
                         isCorrect={isTitleCorrect}
                         errorMessage="The title should have at least 2 letters"
                         input={{
                             name: "title",
                             type: "text",
                             placeholder: "JavaScript #16 POO"
                         }}
                        />

                        <Input
                         label="Episode Link"
                         value={form.info.link}
                         onChange={form.handleChanges}
                         isCorrect={isLinkCorrect}
                         errorMessage="The link you entered is invalid (Remember that it must be embed you can find the link on youtube)"
                         input={{
                             name: "link",
                             type: "text",
                             placeholder: "Z8BcSiuEKXk"
                         }}
                        />
                        
                        <textarea 
                         className="overview"
                         value={form.info.overview}
                         name="overview"
                         placeholder="Insert a description to the episode"
                         onChange={form.handleChanges}
                        />

                        <div className="action-container">
                            <button 
                             type="reset"
                             className="button"
                             onClick={() => navigateTo(-1, { replace: true })} 
                            >
                                Cancel
                            </button>

                            <button 
                             className="button button-green"
                             disabled={theresSomethingWrong} 
                            >
                                Add Episode
                            </button>
                        </div>
                    </form>
                </article>
            </Modal>
        </main>
    )
}

export default NewEpisode;