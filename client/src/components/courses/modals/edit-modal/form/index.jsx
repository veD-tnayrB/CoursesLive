import { useCoursesContext } from 'src/contexts/course/course.context';
import { createCourse } from 'src/services/courses';
import ValidationInput from 'src/components/common/validation-input';
import CreationModalActions from './actions';
import useForm from 'src/hooks/useForm';
import Levels from '../../../levels/Levels';
// import './form.scss';

const namePattern = /./;
const descriptionPattern = /.{0,250}/;
const levelPattern = /^(Beginner|Mid Level|Senior)$/;
const tagsPattern = /[a-zA-Z]\,/;

const INITIAL_VALUES = {
    name: {value: '', isCorrect: false, validation: namePattern},
    description: {value: '', isCorrect: true, validation: descriptionPattern},
    level: {value: 'Beginner', isCorrect: true, validation: levelPattern},
    tags: {value: '', isCorrect: true, validation: tagsPattern}
}
const TOTAL_INPUTS = Object.keys(INITIAL_VALUES);

export default function EditCourseForm() {
    const { setCourses, setModals } = useCoursesContext();
    const {form, handleChanges, setFormValues} = useForm(INITIAL_VALUES);

    const correctInputs = Object.keys(form).filter(prop => form[prop].isCorrect);
    const isInfoCorrect = correctInputs.length === TOTAL_INPUTS.length;

    function edit(event) {
        event.preventDefault();
        const separatedTags = form.tags.value.split(',');
        const formatedTags = separatedTags.length > 1 ? separatedTags : [];

        const formatedCourse = {
            name: form.name.value,
            description: form.description.value,
            level: form.level.value,
            tags: formatedTags
        };

        createCourse(formatedCourse)
        .then(newCourse => {
            setModals(otherModals => ({...otherModals, create: {...otherModals.create, show: false}}));
            setCourses(otherCourses => [newCourse, ...otherCourses]);
        });
    }

    return (
        <form className="create-course-form" onSubmit={edit}>
            <ValidationInput 
                type="text"
                name="name"
                value={form.name.value}
                onChange={handleChanges}
                placeholder="Name"
                autoComplete="off"
                isCorrect={form.name.isCorrect} 
            />

            <div className="input-container">
                <textarea 
                    type="text"
                    name="description"
                    value={form.description.value}
                    onChange={handleChanges}
                    placeholder="Description (Optional)"
                    autoComplete="off" 
                />
            </div>

            <Levels form={form} setFormValues={setFormValues} />

            <ValidationInput 
                type="text"
                name="tags"
                value={form.tags.value}
                onChange={handleChanges}
                placeholder="Tags (Optional)"
                autoComplete="off"
                isCorrect={form.tags.isCorrect} 
            />

            <CreationModalActions isInfoCorrect={isInfoCorrect} />
        </form>
    )
}