export default function AdminEpisodesActionsPreaload() {
	return (
		<div className="main-episodes-actions preload">
			<div className="action-button" title="Edit episode">
				<EditIcon className="icon" />
			</div>
			<div className="action-button" title="Delete episode">
				<DeleteIcon className="icon" />
			</div>
		</div>
	);
}
