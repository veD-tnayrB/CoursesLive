import * as React from "react"
import { VIDEOS_ROUTES } from "src/services/config"
import { VideoContext } from "./context";
import EpisodeDurationController from "./duration-controller";
import EpisodeVolumeController from "./volume-controller";
import PlayButton from "./play-button";

export default function Video({ episode }) {
    const [isVideoPlaying, setIsVideoPlaying] = React.useState(false);
    const videoRef = React.useRef(null);

    function handleEnd() {
        setIsVideoPlaying(false);
    }

    const contextValue = {
        videoRef,
        setIsVideoPlaying,
        isVideoPlaying
    }
    return (
        <VideoContext.Provider value={contextValue}>
            <div className="video-container">
                <video 
                    onEnded={handleEnd} 
                    ref={videoRef}
                    className="video"
                    src={`${VIDEOS_ROUTES}${episode.video}`} 
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
    )
}