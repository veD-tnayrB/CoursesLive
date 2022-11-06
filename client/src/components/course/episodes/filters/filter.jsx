export default function Filter({ selectedValue, setSelectedValue, value }) {
    const isSelected = selectedValue === value ? 'selected' : '';

    function handleClick() {
        setSelectedValue(value);
    }

    return (
        <li className={`filter ${isSelected}`}>
            <button onClick={handleClick}>{value}</button>
        </li>
    );
}
