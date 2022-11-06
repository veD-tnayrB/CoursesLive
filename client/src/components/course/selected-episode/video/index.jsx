import * as React from 'react';
import { useCourseContext } from 'src/contexts/course/course.context';
import { VIDEOS_ROUTES } from 'src/services/config';
import { VideoContext } from './context';
import EpisodeDurationController from './duration-controller';
import EpisodeVolumeController from './volume-controller';
import PlayButton from './play-button';

export default function Video() {
    const { selectedEpisode } = useCourseContext();
    const [isVideoPlaying, setIsVideoPlaying] = React.useState(false);
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
                <video
                    onEnded={handleEnd}
                    ref={videoRef}
                    className="video"
                    src={`${VIDEOS_ROUTES}${selectedEpisode.video}`}
                />
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
