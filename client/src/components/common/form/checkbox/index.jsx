import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import './checkbox.scss';

export default function CheckBox({ handleChange, checkbox, selectedOption }) {
    const { label, value } = checkbox;
    const isSelected = selectedOption === value;

    const icon = isSelected ? <CheckBoxIcon className="icon" /> : <CheckBoxOutlineBlankIcon className="icon" />;

    return (
        <div className="checkbox">
            <label>
                {icon}

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