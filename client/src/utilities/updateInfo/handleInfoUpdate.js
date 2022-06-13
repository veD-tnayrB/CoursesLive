export const handleInfoUpdate = (stateToUpdate, event) => {
    const { value } = event.target;
    stateToUpdate(value);
}