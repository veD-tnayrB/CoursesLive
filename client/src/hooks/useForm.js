import * as React from 'react';
import { inputHandleChange } from 'src/utils/input';

export default function useForm(initialValues, errors) {
    const [form, setFormValues] = React.useState(initialValues);

    const handleChange = (event) => {
        inputHandleChange(event, setFormValues);
        
    };

    const handleChanges = (event) => {
        const { value, name } = event.target;
        const isCorrect = form[name].validation.test(value);

        setFormValues({...form, [name]: {...form[name], value, isCorrect}});
    };

    return { form, handleChange, handleChanges, setFormValues };
}