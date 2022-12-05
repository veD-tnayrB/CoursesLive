import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';

export default function DropzoneFilled({ message }) {
	return (
		<div className="filled-dropzone">
			<FileDownloadDoneIcon className="icon" />
			<p>{message}</p>
		</div>
	);
}
