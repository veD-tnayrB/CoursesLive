import * as React from 'react'
import { useDropzone } from 'react-dropzone'

export default function VideoDropzone({ setVideo }) {
    const onDrop = React.useCallback(files => {
        const videoFile = files[0];
        setVideo(videoFile);
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                    <p>Drop the files here ...</p> :
                    <p>Drag 'n' drop some files here, or click to select files</p>
            }
        </div>
    )
}