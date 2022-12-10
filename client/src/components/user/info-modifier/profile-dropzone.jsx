import * as React from 'react';
import { useDropzone } from 'react-dropzone';
import Dropzone from 'src/components/common/dropzone';

export default function ProfileDropzone({ profile, setProfile }) {
	const onDrop = React.useCallback((files) => {
		const imageFile = files[0];
		setProfile(imageFile);
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

	return <Dropzone className="profile-dropzone" fileExist={profile.name} rootProps={rootProps} inputProps={inputProps} filledMessage="The profile has been saved" emptyMessage="Insert the new profile image" />;
}
