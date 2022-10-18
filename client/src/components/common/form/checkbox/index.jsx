import './checkbox.scss';

export default function CheckBox({ handleChange, checkbox, selectedOption }) {
    const { label, value } = checkbox;
    const isSelected = selectedOption === value;

    const icon = isSelected ? 'src/assets/icons/checked.svg' : 'src/assets/icons/unchecked.svg';

    return (
        <div className="checkbox">
            <label>
                <img
                    src={icon}
                    alt=""
                    className="icon"
                />

                <input
                    type="radio"
                    value={value}
                    checked={isSelected}
                    onChange={handleChange}
                    required
                />

                <span>{label}</span>
            </label>
        </div>
    )
}