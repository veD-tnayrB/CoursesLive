import * as React from 'react';
import { useDropzone } from 'react-dropzone';
import Empty from './empty';
import './create-episode.scss';

export default function CreateEpisode() {
    const [file, setFile] = React.useState({});

    const onDrop = React.useCallback((acceptedFiles) => {
        console.log(acceptedFiles);
        setFile(acceptedFiles[0]);
    }, []) 

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData();
        console.log(file);
        formData.append("video", file);
        uploadEpisode()
        .then(response => {
            console.log('JA')
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <div {...getRootProps()} className="create-episode-dropzone">
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <p>Drop the files here ...</p> :
                        <Empty />
                }
            </div>

            <button>
                Hace cosa picha
            </button>
        </form>
    )
}