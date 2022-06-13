import { useState } from 'react';

const useForm = (initialValue) => {
    const [info, setInfo] = useState(initialValue);

    const handleChanges = (event) => {
        const { name, value } = event.target;

        setInfo(prevInfo => ({
            ...prevInfo,
            [name]: value
        }))
    }

    return { info, setInfo, handleChanges };
}

export { useForm };