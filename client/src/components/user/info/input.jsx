import * as React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import ValidationInput from 'src/components/common/form/validation-input';

export default function Input({ value, onChange, isCorrect, placeholder, name }) {
	const [edit, setEdit] = React.useState(false);
	const cls = edit ? 'edit' : '';

	function openEdit() {
		setEdit(true);
	}

	return (
		<div className={`selectable-input ${cls}`} onClick={openEdit}>
			<span>{value}</span>
			<ValidationInput name={name} value={value} isCorrect={isCorrect} placeholder={placeholder} onChange={onChange} />
			<EditIcon />
		</div>
	);
}
