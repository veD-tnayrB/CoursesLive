import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useCourseContext } from 'src/contexts/course/course.context';
import { VIDEOS_ROUTES } from 'src/services/config';
import { VideoContext } from './context';
import EpisodeDurationController from './duration-controller';
import EpisodeVolumeController from './volume-controller';
import PlayButton from './play-button';
import { useUserContext } from 'src/contexts/user/user.context';

export default function Video() {
	const [isVideoPlaying, setIsVideoPlaying] = React.useState(false);
	const { selectedEpisode } = useCourseContext();
	const { user } = useUserContext();
	const { episodeId } = useParams();
	const videoRef = React.useRef(null);

	function handleEnd() {
		setIsVideoPlaying(false);
	}

	const contextValue = {
		videoRef,
		setIsVideoPlaying,
		isVideoPlaying,
	};
	return (
		<VideoContext.Provider value={contextValue}>
			<div className="video-container">
				<video onEnded={handleEnd} ref={videoRef} className="video" src={`${VIDEOS_ROUTES}${user.id}/${episodeId}/${selectedEpisode.video}`} />
				<PlayButton />

				<div className="controls">
					<EpisodeDurationController />
					<div className="sub-controls">
						<PlayButton />
						<EpisodeVolumeController />
					</div>
				</div>
			</div>
		</VideoContext.Provider>
	);
}