import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import './checkbox.scss';

export default function CheckBox({ handleChange, checkbox, selectedOption, disabled = false }) {
	const { label, value } = checkbox;
	const isSelected = selectedOption === value;
	const disabledClass = disabled ? 'disabled' : '';

	function onChange(event) {
		if (disabled) return;
		handleChange(event);
	}

	const Icon = isSelected ? CheckBoxIcon : CheckBoxOutlineBlankIcon;

	return (
		<div className={`checkbox ${disabledClass}`}>
			<label>
				<Icon className="icon" />
				<input type="radio" value={value} checked={isSelected} onChange={onChange} required />
				<span>{label}</span>
			</label>
		</div>
	);
}
