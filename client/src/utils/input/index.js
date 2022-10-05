export function inputHandleChange(event, setterState) {
    const { value } = event.target;
    setterState(value);
}

export function multiInputHandleChange(event, setterState) {
    const { value, name } = event.target;
    setterState(currentValue => ({...currentValue, [name]: value}))
}