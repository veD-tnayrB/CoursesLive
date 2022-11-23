import * as React from 'react';
import { useDropzone } from 'react-dropzone';
import EmptyDropzone from './empty';
import DropzoneFilled from './filled';

export default function MiniatureDropzone({ image, setImage }) {
	const onDrop = React.useCallback((files) => {
		const imageFile = files[0];
		setImage(imageFile);
	}, []);
	const { getRootProps, getInputProps } = useDropzone({ onDrop });

	return (
		<div {...getRootProps()} className="image-dropzone">
			<input {...getInputProps()} />
			{image.name ? <DropzoneFilled /> : <EmptyDropzone />}
		</div>
	);
}
