import EpisodeCreatorPreaload from './creator';
import LikePreload from './like';
import MorePreload from './more';
import TestButtonPreload from './test';

export default function MainActionsPreaload() {
	return (
		<section className="main-actions">
			<EpisodeCreatorPreaload />
			<div className="right">
				{/* {testButton} */}
				<TestButtonPreload />
				<LikePreload />
				<MorePreload />
			</div>
		</section>
	);
}
