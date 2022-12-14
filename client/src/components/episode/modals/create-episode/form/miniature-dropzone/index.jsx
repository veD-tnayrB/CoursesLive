import * as React from 'react';
import Dropzone from 'src/components/common/dropzone';
import { useDropzone } from 'react-dropzone';

export default function MiniatureDropzone({ files, setFiles }) {
	const image = files?.image;

	const onDrop = React.useCallback((files) => {
		const imageFile = files[0];
		setFiles((otherValues) => ({ ...otherValues, image: imageFile }));
	}, []);
	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: {
			'image/*': ['.png', '.jpeg', '.jpg', '.webp'],
		},
		multiple: false,
	});

	const rootProps = getRootProps();
	const inputProps = getInputProps();

	return <Dropzone rootProps={rootProps} inputProps={inputProps} filledMessage="The thumbnail has been saved" emptyMessage="Insert the thumbnail of your episode here" fileExist={image.name} />;
}
