import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

export default function LikePreload() {
	return (
		<div className="action-button like">
			<ThumbUpOffAltIcon className="icon" />
			<div className="quantity"></div>
		</div>
	);
}
