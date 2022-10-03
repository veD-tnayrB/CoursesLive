export function inputHandleChange( event, setterState) {
    const { value } = event.target;
    setterState(value);
}