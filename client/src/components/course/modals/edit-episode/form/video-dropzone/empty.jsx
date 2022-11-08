import * as React from 'react';
import FileUploadIcon from '@mui/icons-material/FileUpload';

export default function EmptyDropzone() {
    return (
        <div className="empty-dropzone">
            <FileUploadIcon className="icon" />
            <p>Drop your episode here!</p>
        </div>
    )
}