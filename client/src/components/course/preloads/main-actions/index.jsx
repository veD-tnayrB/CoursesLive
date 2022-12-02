import EpisodeCreatorPreaload from './creator';
import LikePreload from './like';
import MorePreload from './more';

export default function MainActionsPreaload() {
	return (
		<section className="main-actions">
			<EpisodeCreatorPreaload />
			<div className="right">
				{/* {testButton} */}
				<LikePreload />
				<MorePreload />
			</div>
		</section>
	);
}
