import * as React from "react"
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { VIDEOS_ROUTES } from "src/services/config"
import VideoControls from "./controls";
import { VideoContext } from "./context";

export default function Video({ episode }) {
    const [isVideoPlaying, setIsVideoPlaying] = React.useState(false);
    const videoRef = React.useRef(null);

    function playToggle() {
        if (!isVideoPlaying) {
            videoRef.current.play();
            setIsVideoPlaying(true);
            return;
        };
        
        videoRef.current.pause();
        setIsVideoPlaying(false);
    }

    const playingIcon = isVideoPlaying ? <PauseIcon /> : <PlayArrowIcon />;


    const contextValue = {
        videoRef
    }
    return (
        <VideoContext.Provider value={contextValue}>
            <div className="video-container">
                <video 
                    ref={videoRef}
                    className="video"
                    src={`${VIDEOS_ROUTES}${episode.video}`} 
                />

                <button 
                    onClick={playToggle}
                    className="play-btn"
                >
                    {playingIcon}
                </button>

                <VideoControls videoRef={videoRef} />
            </div>
        </VideoContext.Provider>
    )
}