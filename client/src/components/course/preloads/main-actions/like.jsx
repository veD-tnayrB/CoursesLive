import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

export default function LikePreload() {
	return (
		<div className="action-button like">
			<ThumbUpAltIcon />
			<div className="quantity"></div>
		</div>
	);
}
