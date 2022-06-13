import { useNavigate, useParams } from 'react-router-dom';

import Input from 'components/input';
import Modal from 'components/modal';
import ListOfDays from 'pages/main/pages/course/components/listOfDays';

import { useCourses, useForm } from 'hooks';


const ModifyCourse = () => {
    const { courseId } = useParams();
    const { coursesList, setCoursesList } = useCourses();
    
    // Get the course prev data
    const form = useForm(() => coursesList.find(course => course.id === courseId));
    const navigateTo = useNavigate();


    // Save all changes on LocalStorage
    const saveChanges = (event) => {
        event.preventDefault();

        setCoursesList(prevCourses => (
            prevCourses.map(course => {
                if (course.id === courseId) {
                    return {
                        ...course,
                        id: form.info.id,
                        name: form.info.name,
                        days: form.info.days
                    }
                }

                return course;
            })
        ))

        navigateTo(-1, { replace: true });
    }

    // Validators
    const isNameCorrect = form.info.name.length > 2;
    const isDaysCorrect = form.info.days.length > 0;
    
    const validators = [isNameCorrect, isDaysCorrect];
    const theresSomethingWrong = validators.some(validator => validator === false);


    return (
        <main className="modal-container">
            <Modal>
                <article>
                    <h1>Settings</h1>
                    <form onSubmit={saveChanges}>
                        <Input 
                         label="Course Name"
                         value={form.info.name}
                         isCorrect={isNameCorrect}
                         onChange={form.handleChanges}
                         input={{
                             name: "name",
                             placeholder: "Course name",
                             type: "text"
                         }}
                        />

                        <ListOfDays 
                         value={form.info.days}
                         stateToUpdate={form.setInfo}
                        />
                        
                        <div className="action-container">
                            <button 
                             type="reset"
                             className="button cancel"
                             onClick={() => navigateTo(-1, { replace: true })}
                            >
                                Cancel
                            </button>

                            <button 
                             className="button button-green"
                             disabled={theresSomethingWrong}
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </article>
            </Modal>
        </main>
    )
}

// label, input, value, onChange, errorMessage, isCorrect

export default ModifyCourse;