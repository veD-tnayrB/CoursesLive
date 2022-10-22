import * as React from 'react';
import { useDropzone } from 'react-dropzone';
import Empty from './empty';
import './create-episode.scss';

export default function CreateEpisode() {
    const [file, setFile] = React.useState({});
    console.log(1,file);

    function onDrop(acceptedFiles) {
        setFile(acceptedFiles);
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div {...getRootProps()} className="create-episode-dropzone">
            <input {...getInputProps()} />
            {
                isDragActive ?
                    <p>Drop the files here ...</p> :
                    <Empty />
            }
        </div>
    )
}