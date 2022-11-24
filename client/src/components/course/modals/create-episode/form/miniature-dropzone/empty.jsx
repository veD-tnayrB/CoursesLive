import FileUploadIcon from '@mui/icons-material/FileUpload';

export default function EmptyMiniatureDropzone() {
	return (
		<div className="empty-dropzone">
			<FileUploadIcon className="icon" />
			<p>Drop your miniature here!</p>
		</div>
	);
}
