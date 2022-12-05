import FileUploadIcon from '@mui/icons-material/FileUpload';

export default function EmptyDropzone({ message }) {
	return (
		<div className="empty-dropzone">
			<FileUploadIcon className="icon" />
			<p>{message}</p>
		</div>
	);
}
