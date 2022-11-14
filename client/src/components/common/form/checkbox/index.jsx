import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import './checkbox.scss';

export default function CheckBox({ handleChange, checkbox, selectedOption }) {
	const { label, value } = checkbox;
	const isSelected = selectedOption === value;

	const Icon = isSelected ? CheckBoxIcon : CheckBoxOutlineBlankIcon;

	return (
		<div className="checkbox">
			<label>
				<Icon className="icon" />

				<input type="radio" value={value} checked={isSelected} onChange={handleChange} required />

				<span>{label}</span>
			</label>
		</div>
	);
}
