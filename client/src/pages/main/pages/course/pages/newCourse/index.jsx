import { useNavigate } from 'react-router-dom';
import uniqid from 'uniqid';

import Modal from 'components/modal';
import Input from 'components/input';

import { useCourses, useLoggedUser, useForm } from 'hooks';

import ListOfDays from 'pages/main/pages/course/components/listOfDays';


const NewCourse = () => {
    const form = useForm({
        id: uniqid(),
        name: '',
        days: []
    });
    const { loggedUser } = useLoggedUser();
    const { setCoursesList } = useCourses();
    const navigateTo = useNavigate();


    // Create course using the recopilated info from form.info state
    const createCourse = (event) => {
        event.preventDefault();
        
        setCoursesList(prevCourses => (
            [
                ...prevCourses,
                {
                    id: form.info.id,
                    name: form.info.name,
                    days: form.info.days,
                    creator: loggedUser.mail,
                    episodes: []
                }
            ]
        ))

        navigateTo(-1, { replace: true });
    }

    // Validators
    const isNameCorrect = /^[A-Za-z]+/.test(form.info.name);
    const isDaysCorrect = form.info.days.length > 0;

    const validators = [isNameCorrect, isDaysCorrect];
    const theresSomethingWrong = validators.some(validator => validator === false);


    return (
        <main className="modal-container">
            <Modal>
                <article>
                    <h1>Create Course</h1>
                    <form onSubmit={createCourse}>
                        <Input
                         label="Course Name"
                         value={form.info.name}
                         isCorrect={isNameCorrect}
                         onChange={form.handleChanges}
                         errorMessage="The course name shouldnt be empty"
                         input={{
                             type: "text",
                             name: "name",
                             placeholder: "Insert a name"
                         }}
                        />

                        <ListOfDays 
                         value={form.info.days}
                         stateToUpdate={form.setInfo}
                        />

                        {
                            isDaysCorrect ||
                            <div className="error-message">
                                <p>
                                    You must select at least one day a week
                                </p>
                            </div>
                        }

                        <div className="action-container">
                            <button
                             className="button cancel"
                             onClick={() => navigateTo(-1, { replace: true })}
                             type="reset"
                            >
                                Cancel
                            </button>

                            <button
                             className="button button-green"
                             disabled={theresSomethingWrong}
                            >
                                Create
                            </button>
                        </div>
                    </form>       
                </article>       
            </Modal>
        </main> 
    )       
}    
    
export default NewCourse;                                                                                                                                                                                                                                   