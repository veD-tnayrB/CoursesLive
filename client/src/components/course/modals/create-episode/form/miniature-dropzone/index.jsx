import * as React from 'react';
import { useDropzone } from 'react-dropzone';
import EmptyDropzone from './empty';
import DropzoneFilled from './filled';

export default function MiniatureDropzone({ files, setFiles }) {
	const image = files.image;

	const onDrop = React.useCallback((files) => {
		const imageFile = files[0];
		setFiles((otherValues) => ({ ...otherValues, image: imageFile }));
	}, []);
	const { getRootProps, getInputProps } = useDropzone({ onDrop });

	return (
		<div {...getRootProps()} className="dropzone">
			<input {...getInputProps()} />
			{image.name ? <DropzoneFilled /> : <EmptyDropzone />}
		</div>
	);
}
