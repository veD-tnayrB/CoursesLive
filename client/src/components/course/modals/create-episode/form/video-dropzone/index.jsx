import * as React from 'react'
import { useDropzone } from 'react-dropzone'
import EmptyDropzone from './empty';
import DropzoneFilled from './filled';

export default function VideoDropzone({ video, setVideo }) {
    const onDrop = React.useCallback(files => {
        const videoFile = files[0];
        setVideo(videoFile);
    }, [])
    const { getRootProps, getInputProps } = useDropzone({ onDrop })
    console.log(video)
    return (
        <div {...getRootProps()} className="video-dropzone">
            <input {...getInputProps()} />
            {
                video.name ?
                    <DropzoneFilled /> :
                    <EmptyDropzone />
            }
        </div>
    )
}