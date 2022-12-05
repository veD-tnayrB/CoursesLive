import * as React from 'react';
import Dropzone from 'src/components/common/dropzone';
import { useDropzone } from 'react-dropzone';

export default function CoverDropzone({ file, setFile }) {
	const cover = file?.image;

	const onDrop = React.useCallback((file) => {
		const imageFile = file[0];
		setFile((otherValues) => ({ ...otherValues, image: imageFile }));
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

	return <Dropzone rootProps={rootProps} inputProps={inputProps} filledMessage="The course thumbnail has been successfully saved." emptyMessage="Insert the thumbnail of the course to be used" fileExist={cover?.name} />;
}
