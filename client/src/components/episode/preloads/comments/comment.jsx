export default function CommentPreload() {
	return (
		<li className="comment">
			<article>
				<header>
					<div className="user-img"></div>
					<div className="creator"></div> <span className="time-ago"></span>
				</header>
				<div className="content"></div>
				<div className="actions"></div>
			</article>
		</li>
	);
}
