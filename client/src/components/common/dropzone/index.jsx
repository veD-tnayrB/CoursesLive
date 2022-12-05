import EmptyDropzone from './empty';
import DropzoneFilled from './filled';
import './dropzone.scss';

export default function Dropzone({ fileExist, rootProps, inputProps, filledMessage = '', emptyMessage = '', className = '' }) {
	return (
		<div {...rootProps} className={`dropzone ${className}`}>
			<input {...inputProps} />
			{fileExist ? <DropzoneFilled message={filledMessage} /> : <EmptyDropzone message={emptyMessage} />}
		</div>
	);
}
