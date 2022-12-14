import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useEpisodeContext } from 'src/contexts/episode/episode.context';
import { courseMediaBasePaths } from 'src/services/config';
import { VideoContext } from './context';
import EpisodeDurationController from './duration-controller';
import EpisodeVolumeController from './volume-controller';
import PlayButton from './play-button';
import { useAuthContext } from 'src/contexts/auth/auth.context';

export default function Video() {
	const [isVideoPlaying, setIsVideoPlaying] = React.useState(false);
	const { course, selectedEpisode } = useEpisodeContext();
	const { user } = useAuthContext();
	const { episodeId } = useParams();
	const videoRef = React.useRef(null);

	function handleEnd() {
		setIsVideoPlaying(false);
	}

	const videoSrc = `${courseMediaBasePaths.video}${user.id}/${episodeId}/${course.folder}/${selectedEpisode.video}`;

	const contextValue = {
		videoRef,
		setIsVideoPlaying,
		isVideoPlaying,
	};
	return (
		<VideoContext.Provider value={contextValue}>
			<div className="video-container">
				<video onEnded={handleEnd} ref={videoRef} className="video" src={videoSrc} />
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
