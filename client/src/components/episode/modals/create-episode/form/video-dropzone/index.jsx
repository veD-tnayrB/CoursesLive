import * as React from 'react';
import Dropzone from 'src/components/common/dropzone';
import { useDropzone } from 'react-dropzone';

export default function VideoDropzone({ files, setFiles }) {
	const video = files?.video;

	const onDrop = React.useCallback((files) => {
		const videoFile = files[0];
		setFiles((otherValues) => ({ ...otherValues, video: videoFile }));
	}, []);

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: {
			'video/*': ['.mp4', '.m4v', '.wmv', '.avi'],
		},
		multiple: false,
	});

	const rootProps = getRootProps();
	const inputProps = getInputProps();

	return <Dropzone rootProps={rootProps} inputProps={inputProps} filledMessage="Your episode is almost ready to be uploaded" emptyMessage="Insert your episode here" fileExist={video.name} />;
}
