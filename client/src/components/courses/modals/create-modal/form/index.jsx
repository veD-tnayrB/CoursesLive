import ValidationInput from "src/components/common/validation-input";
import useForm from "src/hooks/useForm";

/*
    {
    "name": "ReactJS",
    "description": "This course is about SvelteJS",
    "level": "Senior",
    "tags": ["Css", "Html", "JS", "SvelteJS"]
    }
*/

const namePattern = /^[A-Z]{1,1}[a-z]+$/;
const lastNamePattern = /^[A-Z]{1,1}[a-z]+$/;
const levelPattern = /Beginner | Mid Level | Senior/;
const tags = /[\w]{8,16}/;

const INITIAL_VALUES = {
    name: {value: '', isCorrect: false, validation: namePattern},
    description: {value: '', isCorrect: false, validation: lastNamePattern},
    level: {value: '', isCorrect: false, validation: levelPattern},
    tags: {value: '', isCorrect: true, validation: tags}
}
const TOTAL_INPUTS = Object.keys(INITIAL_VALUES);

export default function CreateCourseForm() {
    const {form, handleChanges} = useForm(INITIAL_VALUES);

    const correctInputs = Object.keys(form).filter(prop => form[prop].isCorrect);
    const isInfoCorrect = correctInputs.length === TOTAL_INPUTS.length;

    return (
        <form>
            <ValidationInput 
                type="text"
                name="name"
                value={form.name.value}
                onChange={handleChanges}
                placeholder="Name"
                autoComplete="off"
                isCorrect={form.name.isCorrect} 
            />

            <ValidationInput 
                type="text"
                name="description"
                value={form.description.value}
                onChange={handleChanges}
                placeholder="Description"
                autoComplete="off"
                isCorrect={form.description.isCorrect} 
            />

            <ValidationInput 
                type="text"
                name="level"
                value={form.level.value}
                onChange={handleChanges}
                placeholder="Level"
                autoComplete="off"
                isCorrect={form.level.isCorrect} 
            />

            <ValidationInput 
                type="text"
                name="tags"
                value={form.tags.value}
                onChange={handleChanges}
                placeholder="Level"
                autoComplete="off"
                isCorrect={form.tags.isCorrect} 
            />
        </form>
    )
}