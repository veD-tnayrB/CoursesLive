import { levelsList } from './levels';
import ValidationInput from 'src/components/common/validation-input';
import CreationModalActions from './actions';
import useForm from 'src/hooks/useForm';
import Level from './level';
import './form.scss';

const namePattern = /./;
const lastNamePattern = /./;
const levelPattern = /./;
const tagsPattern = /[a-zA-Z]\,/;

const INITIAL_VALUES = {
    name: {value: '', isCorrect: false, validation: namePattern},
    description: {value: '', isCorrect: true, validation: lastNamePattern},
    level: {value: 'Begginer', isCorrect: false, validation: levelPattern},
    tags: {value: '', isCorrect: false, validation: tagsPattern}
}
const TOTAL_INPUTS = Object.keys(INITIAL_VALUES);

export default function CreateCourseForm() {
    const {form, handleChanges, setFormValues} = useForm(INITIAL_VALUES);

    const correctInputs = Object.keys(form).filter(prop => form[prop].isCorrect);
    const isInfoCorrect = correctInputs.length === TOTAL_INPUTS.length;

    const levelElements = levelsList.map(level => (
        <Level key={level.value} level={level} selectedLevel={form.level.value} setFormValues={setFormValues} />
    ))

    function create(event) {
        event.preventDefault();
        // Do things
    }

    return (
        <form className="create-course-form" onSubmit={create}>
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

            <div className="levels-container">
                {levelElements}
            </div>

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