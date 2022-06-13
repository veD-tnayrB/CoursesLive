export const handleMultipleInfoUpdates = (stateToUpdate, event) => {
    const { name, value } = event.target;

    stateToUpdate(prevValues => (
        {
            ...prevValues,
            [name]: value
        }
    ))
}